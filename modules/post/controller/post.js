const pagination = require("../../../commen/services/pagination");
const { search } = require("../../../commen/services/search");
const postModel = require("../../../DB/model/Post");
const userModel = require("../../../DB/model/User");

const createPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const user = await userModel.findById(req.user.id);
        if (user.blockByAdmin || user.deactivateAccount == true) {
            res.status(400).json({ message: "This user cannot add post", status: 400 })
        }
        const post = await postModel.insertMany({ title, desc, createdBy: req.user.id });
        res.status(201).json({ message: "Done", post, status: 201 })

    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const editPost = async (req, res) => {
    try {
        const { title, desc, id } = req.body;
        const post = await postModel.findOne({ _id: id });
        if (post) {
            if (post.createdBy == req.user.id) {
                const editPost = await postModel.updateOne({ _id: id }, { title, desc }, { new: true });
                res.status(200).json({ message: "Done", editPost, status: 200 })
            } else {
                res.status(400).json({ message: "You don't authorized to edit this post", status: 400 })
            }
        } else {
            res.status(400).json({ message: "In-valid post", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const deletePost = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await postModel.findOne({ _id: id });
        if (post) {
            if (post.createdBy == req.user.id) {
                const deletedPost = await postModel.deleteOne({ _id: id });
                res.status(200).json({ message: "Done", deletedPost, status: 200 })
            } else {
                res.status(400).json({ message: "You don't authorized to delete this post", status: 400 })
            }
        } else {
            res.status(400).json({ message: "In-valid post", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const getUserPosts = async (req, res) => {
    try {
        let { page, size } = req.query;
        const { limit, skip } = pagination(page, size)
        const { id } = req.body;
        const user = await userModel.find({ _id: id }).select('-password').limit(limit).skip(skip);
        if (user) {
            const posts = await postModel.find({ createdBy: id })
            res.status(200).json({ message: "Done", posts, status: 200 })
        } else {
            res.status(400).json({ message: "user not existed", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const getUserPostsAndNotBlockedOrDeactivated = async (req, res) => {
    try {
        let { page, size } = req.query;
        const { limit, skip } = pagination(page, size)
        const { id } = req.body;
        const user = await userModel.find({ _id: id, blockByAdmin: false, deactivateAccount: false }).select('-password').limit(limit).skip(skip);
        if (user) {
            const posts = await postModel.find({ createdBy: id })
            res.status(200).json({ message: "Done", posts, status: 200 })
        } else {
            res.status(400).json({ message: "User is Blocked or Deactivated", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const getAllPosts = async (req, res) => {
    try {
        let { page, size } = req.query;
        const { limit, skip } = pagination(page, size)
        const posts = await postModel.find({}).select('-password').limit(limit).skip(skip).populate([{
            path: "createdBy",
            select: "userName email"
        }])
        if (posts) {
            res.status(200).json({ message: "Done", posts, status: 200 })
        } else {
            res.status(400).json({ message: "No Posts", posts, status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const searchPosts = async (req, res) => {
    try {
        const { searchKey } = req.params
        let { page, size } = req.query;
        const { skip, limit } = pagination(page, size)
        const data = await search(postModel, skip, limit, searchKey, ['title'])
        res.status(200).json({ messsaage: "Done", data, status: 200 })
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}

module.exports = {
    createPost,
    editPost,
    deletePost,
    getUserPosts,
    getUserPostsAndNotBlockedOrDeactivated,
    getAllPosts,
    searchPosts
}