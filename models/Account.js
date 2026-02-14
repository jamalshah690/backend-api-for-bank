const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: {
        type: String, required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ["saving", "current"],
        default: "saving"
    },
    balance: { type: Number, default: 0 },
     status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;   