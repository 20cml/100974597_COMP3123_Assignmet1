const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/users'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

router.post('/signup', async (req, res) => {
    const userData = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: "bad request, validation errors." });
    }

    try {
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new User({...userData,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send({ message: "user created successfully." });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({ message: "internal server error." });
    }
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: "bad request, validation errors." });
    }

    try {
        const user = await User.findOne({ username: loginData.username });
        if (!user) {
            return res.status(401).send({ message: "invalid username or password." });
        }

        const match = await bcrypt.compare(loginData.password, user.password);
        if (!match) {
            return res.status(401).send({ message: "invalid username or password." });
        }

        res.status(200).send({ message: "login successful." });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({ message: "internal server error." });
    }
});

module.exports = router;
