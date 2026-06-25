const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    console.log(`🔐 Login attempt: ${identifier}`);

    try {
        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });
        if (!user) {
            console.log('❌ User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`✅ Password match: ${isMatch}`);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;