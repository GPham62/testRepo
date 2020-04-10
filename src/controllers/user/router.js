const express = require('express')
const router = express.Router()
const userController = require("./controller")
const { isAdminOrStaff} = require('../../utils/checkRole')

router.post('/add',isAdminOrStaff, userController.createNewUser)
      .post('/update', userController.updateUser)
      .post('/delete',isAdminOrStaff, userController.deleteUserById)
      .post('/findByName', userController.findUserByName)
      .post('/findById', userController.findUserById)
      .get('/findAll', userController.getAllUser)
      .get('/findAllStaff', userController.findAllStaff)
      .get('/findAllTutorAndStudent', userController.findAllTutorAndStudent)
      .post('/findByRole', userController.findUsersByRole)
      .get('/findStudentsWithoutClass', userController.findStudentsWithoutClass)

module.exports = router