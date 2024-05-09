const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Post = require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.get('/posts', authenticate, async (req, res) => {
    try {
        const posts = await Post.find()
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
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error posting: " + error.message });
    }
});

router.put('/like/:postId', authenticate, async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const userIdIndex = post.likes.findIndex(userId => userId.toString() === req.user.id);

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

module.exports = router;

