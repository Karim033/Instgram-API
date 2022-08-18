const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, ref: "User" },
    postID: { type: mongoose.Types.ObjectId, ref: "Post" },
    reportComment: { type: String, required: true },
}, {
    timestamps: true
});

const reportModel = mongoose.model('Report', reportSchema);
module.exports = reportModel;