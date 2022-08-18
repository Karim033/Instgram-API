const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    desc: { type: String, required: true },
    reported: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;