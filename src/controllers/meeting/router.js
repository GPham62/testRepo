const express = require('express')
const router = express.Router()
const meetingController = require("./controller")

router.post('/add', meetingController.add)
      .post('/findMeetingsByClassId', meetingController.findMeetingsByClassId)

module.exports = router