const { auth } = require('../../middleWear/auth');
const handelValidation = require('../../middleWear/handelValidation');
const { signUp,
    confirmEmail,
    resendConfirmationEmails,
    signIn,
    updateProfile,
    updatePassword,
    blockByAdmin,
    deactivateAccount,
    addAdmin,
    getAdmin,
    deleteAdmin,
    updateAdmin,
    searchUser,
} = require('./controller/user');
const { sendActivationCode, changePassword } = require('../user/controller/forgetPssword')
const endPoint = require('./endPoint');
const {
    signUpValidation,
    signInValidation,
    updateProfileValidation,
    updatePasswordValidation,
    blockByAdminValidation,
    deactivateAccountValidation,
    addAdminValidation,
    deleteAdminValidation,
    updateAdminValidation,
    searchValidation,
    forgetPasswordValidation,
    getAdminValidation
} = require('./user.validation');

const router = require('express').Router();

router.post('/user/signUp', handelValidation(signUpValidation), signUp);
// router.get('/user/confirm/:token', confirmEmail);
// router.get('/user/email/re_send/:token', resendConfirmationEmails);
router.post('/user/signIn', handelValidation(signInValidation), signIn)
router.patch('/user/updatePofile/:id', auth(endPoint.updateProfile), handelValidation(updateProfileValidation), updateProfile);
router.patch('/user/updatePassword/:id', auth(endPoint.updatePassword), handelValidation(updatePasswordValidation), updatePassword)
router.patch('/user/blockByAdmin', auth(endPoint.blockByAdmin), handelValidation(blockByAdminValidation), blockByAdmin)
router.patch('/user/deactivateAccount', auth(endPoint.deactivateAccount), handelValidation(deactivateAccountValidation), deactivateAccount)
router.get('/user/sendAvtivationCode', sendActivationCode)
router.patch('/user/forgetPassword', auth(endPoint.forgetPassword), handelValidation(forgetPasswordValidation), changePassword)

// Admin

router.post('/user/addAdmin', handelValidation(addAdminValidation), addAdmin);
router.get('/user/getAdmins', auth(endPoint.getAdmins), handelValidation(getAdminValidation), getAdmin),
    router.delete('/user/deleteAdmin', auth(endPoint.deleteAdmin), handelValidation(deleteAdminValidation), deleteAdmin);
router.patch('/user/updateAdmin/:id', auth(endPoint.updateAdmin), handelValidation(updateAdminValidation), updateAdmin)
router.get('/user/search/:searchKey', handelValidation(searchValidation), searchUser)




module.exports = router