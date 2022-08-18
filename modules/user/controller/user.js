const jwt = require('jsonwebtoken');
const userModel = require('../../../DB/model/User')
const sendEmail = require('../../../commen/email')
const bcrypt = require('bcrypt');
const pagination = require('../../../commen/services/pagination');
const { search } = require('../../../commen/services/search');

const signUp = async(req, res) => {
    try {
        const { userName, email, password, location, phone } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User Already Exist", status: 400 })
        } else {
            const newUser = new userModel({ userName, email, password, location, phone });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.SEKRETKEY, { expiresIn: 3600 });
            const refreshToken = jwt.sign({ id: savedUser._id }, process.env.SEKRETKEY);
            const message = `<a href = "${req.protocol}://${req.headers.host}/user/confirm/${token}">Conferm Email</a> <br>
        <a href = "${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">Re-send Activation Link </a>`
            await sendEmail(email, message);
            res.status(201).json({ message: "Done", status: 201 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }

}
const confirmEmail = async(req, res) => {
    try {
        const { token } = req.params;
        if (!token || token == undefined || token == null) {
            res.status(400).json({ message: "Token Error", status: 400 })
        } else {
            const decoded = jwt.verify(token, process.env.SEKRETKEY);
            const user = await userModel.findOneAndUpdate({ _id: decoded.id, confirmed: false }, { confirmed: true }, { new: true });
            if (user) {
                res.status(200).json({ message: "Confirmed......please login", status: 200 })
            } else {
                res.status(400).json({ message: "in-valid link", status: 400 })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const resendConfirmationEmails = async(req, res, next) => {
    try {
        const { token } = req.params;
        if (!token || token == undefined || token == null) {
            res.status(400).json({ message: "Token Error", status: 400 })
        } else {
            const decoded = jwt.verify(token, process.env.SEKRETKEY);
            const user = await userModel.findOne({ _id: decoded.id, confirmed: false });
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.SEKRETKEY, { expiresIn: 3600 });
                const refreshToken = jwt.sign({ id: user._id }, process.env.SEKRETKEY);
                const message = `<a href = "${req.protocol}://${req.headers.host}/user/confirm/${token}">Conferm Email</a> <br>
                <a href = "${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">Re-send Activation Link </a>`
                await sendEmail(user.email, message);
                res.status(200).json({ message: "Confirmed......please login", status: 200 })
            } else {
                res.status(400).json({ message: "in-valid link", status: 400 })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const signIn = async(req, res) => {
    ص
    try {
        const { email, password } = req.body;
        const user = await userModel.findOneAndUpdate({ email }, { accountStatus: 'online' }, { new: true });
        if (!user) {
            res.status(400).json({ message: "In-valid User" })
        } else {
            if (!user.confirmed) {
                res.status(400).json({ message: 'Please Confirm Your Email First' })
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({ id: user.id, isLoggen: true }, process.env.SEKRETKEY, { expiresIn: 3600 })
                    res.status(200).json({ message: "Done", token, status: 200 })
                } else {
                    res.status(400).json({ message: 'Password and Email misMatch', status: 400 })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const updateProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const { userName, location } = req.body;
        if (id == req.user.id) {
            const updateUser = await userModel.findByIdAndUpdate({ _id: id }, { userName, location }, { new: true })
            res.status(200).json({ message: "Done", updateUser, status: 200 })
        } else {
            res.status(400).json({ message: "In-valid ID", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const updatePassword = async(req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const user = await userModel.findById(req.user.id)
        if (id == req.user.id) {
            const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRounds));
            const match = await bcrypt.compare(oldPassword, user.password);
            if (match) {
                const updatePassword = await userModel.updateOne({ _id: id }, { password: hashedPassword }, { new: true })
                res.status(200).json({ message: "Done", updatePassword, status: 200 })
            } else {
                res.status(400).json({ message: 'Password misMatch', status: 400 })
            }
        }

    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const blockByAdmin = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email }).select('-password')
        if (user.blockByAdmin == true) {
            res.status(400).json({ message: "Email already blocked", status: 400 })
        } else {
            const updateUser = await userModel.updateOne({ email }, { blockByAdmin: true }, { new: true })
            res.status(200).json({ message: "Account is Blocked", updateUser, status: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const deactivateAccount = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email }).select('-password')
        if (user.deactivateAccount == true) {
            res.status(400).json({ message: "Email already deactivated", status: 400 })
        } else {
            const updateUser = await userModel.updateOne({ email: req.user.email }, { deactivateAccount: true })
            res.status(200).json({ message: "Account is Deactivated", updateUser, status: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}

// Admin...........................................................................
const addAdmin = async(req, res) => {
    try {
        const { userName, email, password, location, phone, role } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User Already Exist", status: 400 })
        } else {
            const newUser = new userModel({ userName, email, password, location, phone, role });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.SEKRETKEY, { expiresIn: 3600 });
            const refreshToken = jwt.sign({ id: savedUser._id }, process.env.SEKRETKEY);
            const message = `<a href = "${req.protocol}://${req.headers.host}/user/confirm/${token}">Conferm Email</a> <br>
        <a href = "${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">Re-send Activation Link </a>`
            await sendEmail(email, message);
            res.status(201).json({ message: "Done", status: 201 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const getAdmin = async(req, res) => {
    try {
        let { page, size } = req.query;
        const { limit, skip } = pagination(page, size)
        const users = await userModel.find({ role: "Admin" }).select('-password').limit(limit).skip(skip);
        if (!users) {
            res.status(400).json({ message: "In-valid User", status: 400 })
        } else {
            res.status(200).json({ message: "Done", users, status: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const deleteAdmin = async(req, res) => {
    try {
        const { id } = req.body
        const user = await userModel.findOne({ _id: id, role: "Admin" }).select('-password')
        if (user) {
            const deleteAdmin = await userModel.deleteOne({ _id: id })
            res.status(200).json({ message: "Done", deleteAdmin, status: 200 })
        } else {
            res.status(400).json({ message: "In-valid User", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const updateAdmin = async(req, res) => {
    try {
        const { id } = req.params;
        const { userName, location } = req.body;
        if (id == req.user.id) {
            const updateUser = await userModel.findByIdAndUpdate({ _id: id }, { userName, location }, { new: true })
            res.status(200).json({ message: "Done", updateUser, status: 200 })
        } else {
            res.status(400).json({ message: "In-valid ID", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const searchUser = async(req, res) => {
    try {
        const { searchKey } = req.params
        let { page, size } = req.query;
        const { skip, limit } = pagination(page, size)
        const data = await search(userModel, skip, limit, searchKey, ["userName", "email"])
        res.status(200).json({ messsaage: "Done", data, status: 200 })
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}

module.exports = {
    signUp,
    confirmEmail,
    resendConfirmationEmails,
    signIn,
    updateProfile,
    updatePassword,
    blockByAdmin,
    deactivateAccount,
    addAdmin,
    getAdmin,
    deleteAdmin,
    updateAdmin,
    searchUser
}