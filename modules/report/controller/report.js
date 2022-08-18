const postModel = require('../../../DB/model/Post');
const reportModel = require('../../../DB/model/Report');
const userModel = require('../../../DB/model/User');


const reportPosts = async (req, res) => {
    try {
        const { postID, reportComment, userID } = req.body;
        const post = await postModel.findById(postID)
        if (post) {
            if (post.isBlocked) {
                res.status(400).json({ message: "This post is Blocked", status: 400 })
            } else {
                const user = await userModel.findById(userID)
                if (user) {
                    if (post.createdBy == userID) {
                        res.status(400).json({ message: "You cannot report yourself", status: 400 })
                    } else {
                        const reportPost = await reportModel.findOne({ userID, postID })
                        if (reportPost) {
                            res.status(400).json({ message: "You cannot report this post again", status: 400 })
                        } else {
                            await reportModel.insertMany({ postID, reportComment, userID });
                            res.status(201).json({ messsage: "Done", status: 201 })
                        }
                    }
                }
            }
        } else {
            res.status(400).json({ message: "In-valid post", status: 400 })
        }
    } catch (error) {
        res.status(500).json({ message: "Catch Error", error, status: 500 })
    }
}
const blockPost = async (req, res) => {
    // try {
        const { id } = req.body;
        const post = await postModel.find({ _id: id });
        if (post) {
            if (post.reported) {
                const blockedPost = await postModel.updateOne({ _id: id }, { isBlocked: true })
                res.status(200).json({ message: "Post is Blocked", blockedPost, status: 200 })
            } else {
                res.status(400).json({ message: "Sorry this post is not reported", status: 400 })
            }
        } else {
            res.status(404).json({ message: "post not existed", status: 404 });
        }
    // } catch (error) {
    //     res.status(500).json({ message: "Catch Error", error });
    // }
}
module.exports = {
    reportPosts,
    blockPost
}


