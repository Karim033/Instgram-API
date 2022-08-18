const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const userModel = require('../../../DB/model/User');
const sendEmail = require('../../../commen/email');

const sendActivationCode = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const activationCode = nanoid(10)
        await userModel.updateOne({ email: user.email }, { activationCode: activationCode })
        const message = activationCode
        sendEmail(user.email, message)
        res.status(200).json({ message: "Go to Your Mail", status: 200 });
    } else {
        res.status(400).json({ message: "In-valid Email", status: 400 })
    }
}

const changePassword = async (req, res) => {
    const { activationCode, newPassword } = req.body;
    const activeCode = await userModel.findById(req.user.id).select('activationCode')
    if (activationCode == activeCode.activationCode) {
        const activationCode = nanoid(10)
        let hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
        await userModel.updateMany({ _id: req.user.id }, { password: hashedPassword, activationCode: activationCode });
        res.status(200).json({ message: "Done", status: 200 });
    } else {
        res.status(400).json({ message: "in-valid activation code", status: 400 })
    }
}


module.exports = { sendActivationCode, changePassword }
