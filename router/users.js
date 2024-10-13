const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/users'); 
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    const userData = req.body;

    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: "Bad request, validation errors." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user instance with the hashed password
        const newUser = new User({
            ...userData,
            password: hashedPassword, // Store the hashed password
        });

        // Save the user to MongoDB
        await newUser.save();
        res.status(201).send({ message: "User created successfully." });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({ message: "Internal server error." });
    }
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: "Bad request, validation errors." });
    }

    try {
        const user = await User.findOne({ username: loginData.username });
        if (!user) {
            return res.status(401).send({ message: "Invalid username or password." });
        }

        // Compare provided password with the stored hashed password
        const match = await bcrypt.compare(loginData.password, user.password);
        if (!match) {
            return res.status(401).send({ message: "Invalid username or password." });
        }

        res.status(200).send({ message: "Login successful." });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({ message: "Internal server error." });
    }
});

module.exports = router;
