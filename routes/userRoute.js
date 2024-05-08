const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Post = require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.get('/posts', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const posts = await Post.find()
                                        .populate('author', 'username displayName')
                                        .sort({ createdAt: -1 })
                                        .exec();

        const postsWithUserDetails = posts.map(post => ({
            id: post._id,
            content: post.content,
            time: post.createdAt,
            likes: post.likes,
            username: post.author.username,
            displayName: post.author.displayName
        }));

        res.json(postsWithUserDetails);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts: " + error.message });
    }
});

router.post('/posts', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const newPost = new Post({
            content: req.body.content,
            author: decoded.id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error posting: " + error.message });
    }
});

module.exports = router;

