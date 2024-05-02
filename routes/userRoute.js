const express = require('express');
const router = express.Router();
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).send("Username or email already exists");
        }

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

