const Joi = require('joi');

const addReportValidation = {
    body: Joi.object().required().keys({
        userID: Joi.string().required().max(24).min(24),
        postID: Joi.string().required().max(24).min(24),
        reportComment: Joi.string().required(),
    })
}
const blockedPostVal = {
    body: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}

module.exports = {
    addReportValidation,
    blockedPostVal
}