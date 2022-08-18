const jwt = require('jsonwebtoken');
const userModel = require('../DB/model/User');
const roles = {
    User: 'User',
    Admin: 'Admin',
    SuperAdmin: "Super Admin"
}
const auth = (data) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken || headerToken == undefined || headerToken == null || !headerToken.startsWith('Bearer')) {
                res.status(400).json({ message: "In-valid headerToken" })
            } else {
                const token = headerToken.split(" ")[1];
                const decoded = jwt.verify(token, process.env.SEKRETKEY);
                const user = await userModel.findOne({ _id: decoded.id }).select('-password');
                if (!user) {
                    res.status(400).json({ message: "In-valid Token" })
                } else {
                    if (data.includes(user.role)) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: "Sorry You Are not Authorized", status: 401 })
                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Catch Error", status: 500 });
        }
    }
}

module.exports = { auth, roles };