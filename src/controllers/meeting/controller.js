const { Meeting } = require('../../config/sequelize')
const moment = require('moment')

class MeetingController {
    add(req, res){
        let { meetingName, meetingDuration, meetingStartTime, classId } = req.body

        Meeting.create({
            name: meetingName,
            duration: meetingDuration,
            startTime: meetingStartTime,
            classId
        }).then(meeting => {
            if(meeting){
                console.log(meeting)
                res.send({status: true})
            }else{
                res.send({status: false, message: "Add meeting failed!"})
            }
        })
    }
    findMeetingsByClassId(req, res){
        let { classId } = req.body
        Meeting.findAll({
            where: { classId },
            order: [
                ['startTime', 'ASC'],
            ],
        }).then(meetings => {
            if(meetings){
                meetings.map(function(meeting){
                    let startTime = meeting.startTime
                    meeting.dataValues.startTimeDay = moment(startTime).format('dddd')
                    meeting.dataValues.startTimeDate = moment(startTime).format('MMMM Do YYYY')
                    meeting.dataValues.startTimeTime = moment(startTime).format('hh:mm a')
                    return meeting
                })
                res.send({ status: true, meetings })                
            }else{
                res.send({status: false, message: 'There is no meeting!'})
            }
        })
    }
}
module.exports = new MeetingController ()
