const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    role: { type: String, default: 'User' },
    accountStatus: { type: String, default: "offline" },
    blockByAdmin: { type: Boolean, default: false },
    deactivateAccount: { type: Boolean, default: false },
    activationCode: String
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRounds));
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.secret_key).toString();
    next();
})
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;