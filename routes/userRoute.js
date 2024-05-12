const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Post = require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {startSession} = require("mongoose");

// Authentication middleware
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

router.post('/register', async (req, res) => {
    try {
        const { displayName, username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists" });
        }

        const user = new User({ displayName, username, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" }); // Updated line
    } catch (error) {
        res.status(500).json({ message: error.message }); // Updated line
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-replies/:id', authenticate, async (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).send({ message: "Post ID must be provided" });
    }

    try {
        const initialPost = await Post.findById(postId);
        if (!initialPost) {
            return res.status(404).send({ message: "Post not found" });
        }

        // If there are no replies, return an empty array
        if (!initialPost.replies || initialPost.replies.length === 0) {
            return res.json([]);
        }

        // Fetch all posts in the replies array
        const posts = await Post.find({
            '_id': { $in: initialPost.replies }
        })
            .populate('author', 'username displayName _id')
            .sort({ createdAt: -1 })
            .exec();

        const postsWithUserDetails = posts.map(post => ({
            id: post._id,
            content: post.content,
            time: post.createdAt,
            likes: post.likes,
            replies: post.replies,
            userId: post.author._id,
            username: post.author.username,
            displayName: post.author.displayName
        }));

        res.json(postsWithUserDetails);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        res.status(500).send({ message: error.message });
    }
});


router.get('/posts-home-feed', authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ isReply: false })
            .populate('author', 'username displayName _id')
            .sort({ createdAt: -1 })
            .exec();

        const postsWithUserDetails = posts.map(post => ({
            id: post._id,
            content: post.content,
            time: post.createdAt,
            likes: post.likes,
            replies: post.replies,
            userId: post.author._id,
            username: post.author.username,
            displayName: post.author.displayName
        }));

        res.json(postsWithUserDetails);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts: " + error.message });
    }
});

router.get('/posts-by-user', authenticate, async (req, res) => {
    try {
        const query = {isReply: false};
        if (req.query.userIds) {
            const userIds = Array.isArray(req.query.userIds) ? req.query.userIds : [req.query.userIds];
            query.author = { $in: userIds };
        }
        const posts = await Post.find(query)
            .populate('author', 'username displayName _id')
            .sort({ createdAt: -1 })
            .exec();

        const postsWithUserDetails = posts.map(post => ({
            id: post._id,
            content: post.content,
            time: post.createdAt,
            likes: post.likes,
            userId: post.author._id,
            username: post.author.username,
            displayName: post.author.displayName
        }));

        res.json(postsWithUserDetails);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts: " + error.message });
    }
});

router.post('/posts', authenticate, async (req, res) => {
    try {

        const newPost = new Post({
            content: req.body.content,
            author: req.user.id,
            likes: [],
            replies: [],
            isReply: false,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error posting: " + error.message });
    }
});

router.post('/reply', authenticate, async (req, res) => {
    const { content, rootPostId } = req.body;

    if (!content || !rootPostId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Create the reply post
        const replyPost = new Post({
            content,
            author: req.user.id,
            likes: [],
            replies: [],
            isReply: true,
        });
        await replyPost.save();

        // Find the root post and add the reply ID to the replies array
        const rootPost = await Post.findById(rootPostId);

        rootPost.replies.push(replyPost._id);
        await rootPost.save();

        res.status(201).json({ message: "Reply added successfully", replyPost });
    } catch (error) {
        console.error("Failed to create reply:", error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/like/:postId', authenticate, async (req, res) => {
    const { postId } = req.params;
    console.log(postId)
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const userIdIndex = post.likes.findIndex(userId => userId.toString() === req.user.id);
        console.log(userIdIndex)
        if (userIdIndex !== -1) {
            // User has already liked the post, so remove the like
            post.likes.splice(userIdIndex, 1);
            await post.save();
            res.json({ message: 'Like removed', totalLikes: post.likes.length });
        } else {
            // User has not liked the post, so add a new like
            post.likes.push(req.user.id);
            await post.save();
            res.json({ message: 'Post liked successfully', totalLikes: post.likes.length });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/follow/:id', authenticate, async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const session = await startSession();
    session.startTransaction();

    try {
        const targetUser = await User.findById(targetUserId).session(session);
        const currentUser = await User.findById(currentUserId).session(session);

        if (!targetUser || !currentUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'One or both users not found' });
        }

        // Check if already following
        if (currentUser.following.includes(targetUserId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Already following this user' });
        }

        // Add target user to current user's following list
        currentUser.following.push(targetUserId);

        // Add current user to target user's followers list
        targetUser.followers.push(currentUserId);

        await currentUser.save({ session });
        await targetUser.save({ session });

        await session.commitTransaction();
        session.endSession();
        res.json({ message: 'Followed successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
});
router.post('/unfollow/:id', authenticate, async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const session = await startSession();
    session.startTransaction();

    try {
        const targetUser = await User.findById(targetUserId).session(session);
        const currentUser = await User.findById(currentUserId).session(session);

        if (!targetUser || !currentUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'One or both users not found' });
        }

        // Check if actually following
        if (!currentUser.following.includes(targetUserId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Not following this user' });
        }

        // Remove target user from current user's following list
        currentUser.following.pull(targetUserId);

        // Remove current user from target user's followers list
        targetUser.followers.pull(currentUserId);

        await currentUser.save({ session });
        await targetUser.save({ session });

        await session.commitTransaction();
        session.endSession();
        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;

