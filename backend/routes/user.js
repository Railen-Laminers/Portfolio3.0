const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// GET public profile – no authentication required
// Returns the first admin user's profile (the portfolio owner)
router.get('/profile', async (req, res) => {
    try {
        const admin = await User.findOne({ role: 'admin' }).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Portfolio owner not found' });
        }
        res.json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update profile – admin only
router.put('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Only admin can update
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can update profile' });
        }

        const { username, email, firstName, middleInitial, lastName, bio, location, skills, social, profileImage } = req.body;

        // Check uniqueness if changed
        if (username && username !== user.username) {
            const existing = await User.findOne({ username });
            if (existing) return res.status(400).json({ message: 'Username is already taken' });
        }
        if (email && email !== user.email) {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ message: 'Email is already in use' });
        }

        // Update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (firstName !== undefined) user.firstName = firstName;
        if (middleInitial !== undefined) user.middleInitial = middleInitial;
        if (lastName !== undefined) user.lastName = lastName;
        if (bio !== undefined) user.bio = bio;
        if (location !== undefined) user.location = location;
        if (skills) user.skills = skills;
        if (social) {
            user.social = {
                github: social.github || '',
                facebook: social.facebook || '',
                indeed: social.indeed || '',
            };
        }
        // Store base64 image if provided (validate format)
        if (profileImage !== undefined) {
            if (profileImage && !profileImage.startsWith('data:image/')) {
                return res.status(400).json({ message: 'Invalid image format' });
            }
            user.profileImage = profileImage || '';
        }

        await user.save();

        const updatedUser = await User.findById(req.user.userId).select('-password');
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;