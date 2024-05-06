const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists" });
        }

        const user = new User({ username, email, password });
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

module.exports = router;

