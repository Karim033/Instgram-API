const { roles } = require("../../middlewear/auth");


const endPoint = {
    updateProfile: [roles.Admin, roles.User, roles.SuperAdmin],
    updatePassword: [roles.Admin, roles.User, roles.SuperAdmin],
    blockByAdmin: [roles.Admin, roles.SuperAdmin],
    deactivateAccount: [roles.Admin, roles.User, roles.SuperAdmin],
    getAdmins: [roles.SuperAdmin],
    deleteAdmin: [roles.SuperAdmin],
    updateAdmin: [roles.User, roles.Admin, roles.SuperAdmin],
    forgetPassword: [roles.Admin, roles.User, roles.SuperAdmin]
}

module.exports = endPoint