const { auth } = require('../../middlewear/auth');
const handelValidation = require('../../middleWear/handelValidation');
const { createPost, editPost, deletePost, getUserPosts, getUserPostsAndNotBlockedOrDeactivated, getAllPosts, searchPosts } = require('./controller/post');
const endPoint = require('./endPoint');
const { createPostValidation, editPostValidation, deletePostValidation, getUserPostsValidation, searchValidation, getAllPostsValidation } = require('./post.validation');

const router = require('express').Router();




router.post('/post/createPost', auth(endPoint.createPost), handelValidation(createPostValidation), createPost)
router.patch('/post/editPost', auth(endPoint.editPost), handelValidation(editPostValidation), editPost),
    router.delete('/post/deletePost', auth(endPoint.deletePost), handelValidation(deletePostValidation), deletePost)
router.get('/post/getUserPosts', auth(endPoint.getUserPosts), handelValidation(getUserPostsValidation), getUserPosts)
router.get('/post/getUserPostsAndNotBlockedOrDeactivated', auth(endPoint.getUserPosts), handelValidation(getUserPostsValidation), getUserPostsAndNotBlockedOrDeactivated)
router.get('/post/getAllPosts', auth(endPoint.getAllPosts), handelValidation(getAllPostsValidation), getAllPosts)
router.get('/post/searchPosts/:searchKey', handelValidation(searchValidation), searchPosts)





module.exports = router