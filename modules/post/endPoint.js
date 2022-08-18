const { roles } = require("../../middlewear/auth");


const endPoint = {
    createPost: [roles.Admin, roles.User, roles.SuperAdmin],
    editPost: [roles.Admin, roles.User, roles.SuperAdmin],
    deletePost: [roles.Admin],
    getUserPosts: [roles.Admin],
    getAllPosts: [roles.Admin, roles.SuperAdmin],
}

module.exports = endPoint