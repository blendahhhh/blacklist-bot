const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['roblox', 'discord', 'both'],
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    bannedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blacklist', blacklistSchema); 