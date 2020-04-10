const express = require('express')
const router = express.Router()
const emailController = require('./controller')
const {isStaff} = require('../../utils/checkRole')

router.post('/sendNotificationEmail', emailController.sendNoti)
      .post('/sendStudentsNotiById', emailController.sendStudentsNotiById)

module.exports = router