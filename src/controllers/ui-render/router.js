const express = require('express')
const router = express.Router()
const renderUIController = require("./controller")
const { isAdmin, isStaff, isTutor, isStudent, isStudentOrTutor, isAdminOrStaff } = require('../../utils/checkRole')

router.get('/dashboard', renderUIController.renderDashboardPage)
      .get('/my-tutees', isTutor, renderUIController.renderClassListPage)
      .get('/chat', renderUIController.renderChatPage)
      .get('/class', isStudentOrTutor, renderUIController.renderClassPage)
      .get('/staffManagement', isAdmin, renderUIController.renderStaffManaPage)
      .get('/staffDashboard', isAdmin, renderUIController.renderStaffDashboardPage)
      .get('/class/:id/stream/', isStudentOrTutor, renderUIController.renderClassStreamPage)
      .get('/class/:id/meeting', isStudentOrTutor, renderUIController.renderClassMeetingPage)
      .get('/management', isAdminOrStaff, renderUIController.renderManagementPage)
      .get('/class/:id/people', isStudentOrTutor, renderUIController.renderClassPeoplePage)
      .get('/userManagement', isStaff, renderUIController.renderUserManaPage)
      .get('/classManagement', isStaff, renderUIController.renderClassManaPage)
      .get('/class/studentManagement/', isStaff, renderUIController.renderClassStudentManaPage)
      .get('/classManagement/studentAssignment', isStaff, renderUIController.renderStudentAssignmentPage)
      

module.exports = router
