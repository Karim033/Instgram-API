const { reportPosts, blockPost, } = require('./controller/report');
const handelValidation = require('../../middleWear/handelValidation');
const { addReportValidation, blockedPostVal } = require('./report.validation');
const { auth } = require('../../middlewear/auth');
const endPoint = require('./endPoint');
const router = require('express').Router();


router.post('/report/reportPosts', auth(endPoint.reportPosts), handelValidation(addReportValidation), reportPosts)
router.patch('/report/blockPost', auth(endPoint.blockPost, handelValidation(blockedPostVal)), blockPost)


module.exports = router

