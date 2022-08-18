const { roles } = require("../../middlewear/auth");


const endPoint = {
    reportPosts: [roles.User, roles.Admin, roles.SuperAdmin],
    blockPost: [roles.Admin, roles.SuperAdmin]
}

module.exports = endPoint