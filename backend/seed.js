const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const adminEmail = 'admin@example.com';
        const adminUsername = 'admin';
        const plainPassword = 'admin123';

        // Look for existing admin
        const existing = await User.findOne({
            $or: [{ email: adminEmail }, { username: adminUsername }],
        });

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        if (existing) {
            // Force update password and role
            existing.password = hashedPassword;
            existing.role = 'admin';
            await existing.save();
            console.log('✅ Admin password reset to "admin123"');
        } else {
            const admin = new User({
                username: adminUsername,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            await admin.save();
            console.log('✅ Admin user created: username=admin, password=admin123');
        }
    } catch (err) {
        console.error('❌ Seed error:', err.message);
    } finally {
        process.exit();
    }
};

seedAdmin();