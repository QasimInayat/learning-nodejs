const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    try { 
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { 
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'jwt_secret_key', // TODO: move to .env
            { expiresIn: '1h' }
        );

        res.json({ token });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;