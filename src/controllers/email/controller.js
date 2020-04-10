const { smtpTransport } = require('../../config/email')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const { User, sequelize } = require('../../config/sequelize')
const {Op} = require('sequelize')
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox41ec04324316446e9b38cbcbd70a6b5c.mailgun.org";
const mg = mailgun({apiKey: process.env['API_KEY'], domain: process.env['DOMAIN']});

class emailController {
    sendNoti(req, res) {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../../../', 'views/email/notification/notification-assigned.hbs'), 'utf8');
        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({
            student: 'student',
            tutor: 'tutor'
        })
        var mailOptions = {
            from: 'Notification <no-reply@mydomain.com> ',
            to: "ptuananh196@gmail.com",
            subject: 'notification',
            html: htmlToSend
        }
        
        smtpTransport.sendMail(mailOptions, (err, response) => {
            if (err){
                console.log(err);
                res.send({status: false, message: 'bad email'});
            } else{
                console.log(response)
                res.send({status: true, message:"good email"})
            }
        })
    }

    async sendStudentsNotiById(req, res){
        let studentIds = req.body["studentIds[]"];
        if (studentIds.length > 1) studentIds = studentIds.map(e => parseInt(e))
        else studentIds = [parseInt(studentIds)]
        User.findAll({
            where: {
                id: {[Op.in]: studentIds}
            }
        }).then(users => {
            let studentEmails = [];
            users.forEach(user => {
                studentEmails.push(user.dataValues.email)
            })

            const data = {
                from: "Mailgun Sandbox <no-reply@mailgun.org>",
                to: studentEmails.join(', '),
                subject: "Hello",
                template: "templatetest",
                'h:X-Mailgun-Variables': {tutor: "test"}
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
            });

            // let mailOptions = {
            //     from: 'Notification <no-reply@sandbox41ec04324316446e9b38cbcbd70a6b5c.mailgun.org> ',
            //     to: studentEmails.join(', '),
            //     subject: 'notification',
            //     template: 'templatetest',
            //     'h:X-Mailgun-Variables': {"tutor": "test"}
            // }
            // smtpTransport.sendMail(mailOptions, (err, response) => {
            //     if (err){
            //         console.log(err);
            //         res.send({status: false, message: 'bad email'});
            //     } else{
            //         console.log(response)
            //         res.send({status: true, message:"good email"})
            //     }
            // })
        })

        
    }
}

module.exports = new emailController()