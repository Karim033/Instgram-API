const Joi = require('joi');

const createPostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required()
    })
}
const editPostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        id: Joi.string().required().min(24).max(24)
    })
}
const deletePostValidation = {
    body: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}
const getUserPostsValidation = {
    body: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    }),
    query: Joi.object().required().keys({
        page: Joi.number().required(),
        size: Joi.number().required()
    })
}
const getAllPostsValidation = {
    query: Joi.object().required().keys({
        page: Joi.number().required(),
        size: Joi.number().required()
    })
}
const searchValidation = {
    params: Joi.object().required().keys({
        searchKey: Joi.string().required()
    }),
    query: Joi.object().required().keys({
        page: Joi.number().required(),
        size: Joi.number().required()
    })
}


module.exports = {
    createPostValidation,
    editPostValidation,
    deletePostValidation,
    getUserPostsValidation,
    getAllPostsValidation,
    searchValidation
}