const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const authMG = {
    auth: {
        api_key: process.env['API_KEY'],
        domain: process.env['DOMAIN']
    }
}

const smtpTransport = nodemailer.createTransport(mg(authMG))

module.exports = {smtpTransport}
