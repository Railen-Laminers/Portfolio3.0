const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'guest'], default: 'guest' },
        firstName: { type: String, trim: true },
        middleInitial: { type: String, trim: true, maxlength: 1 },
        lastName: { type: String, trim: true },
        profileImage: { type: String, default: '' }, // Base64 data URL
        bio: { type: String, trim: true },
        location: { type: String, trim: true },
        skills: { type: [String], default: [] },
        social: {
            github: { type: String, trim: true, default: '' },
            facebook: { type: String, trim: true, default: '' },
            indeed: { type: String, trim: true, default: '' },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);