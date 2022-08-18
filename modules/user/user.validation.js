const Joi = require('joi');

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
        location: Joi.string().required(),
        role: Joi.string()
    })
}
const signInValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
}
const updateProfileValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        location: Joi.string().required()
    }),
    params: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}
const updatePasswordValidation = {
    body: Joi.object().required().keys({
        oldPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        newPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cNewPassword: Joi.ref('newPassword')
    }),
    params: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}
const blockByAdminValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
    })
}
const deactivateAccountValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
    })
}
const addAdminValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
        location: Joi.string().required(),
        role: Joi.string().required()
    })
}
const getAdminValidation = {
    query: Joi.object().required().keys({
        page: Joi.number().required(),
        size: Joi.number().required()
    })
}
const deleteAdminValidation = {
    body: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}
const updateAdminValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        location: Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
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
const forgetPasswordValidation = {
    body: Joi.object().required().keys({
        activationCode: Joi.string().required(),
        newPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }),
}
module.exports = {
    signUpValidation,
    signInValidation,
    updateProfileValidation,
    updatePasswordValidation,
    blockByAdminValidation,
    deactivateAccountValidation,
    addAdminValidation,
    getAdminValidation,
    deleteAdminValidation,
    updateAdminValidation,
    searchValidation,
    forgetPasswordValidation
}