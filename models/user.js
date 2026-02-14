const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: {
            type: String,
            required: true
        },
        isActive: { type: Boolean, default: false },
        type: { type: String, enum: ['admin', 'customer'], default: 'customer' },

        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);
const User = mongoose.model('User', userSchema);
module.exports = User;