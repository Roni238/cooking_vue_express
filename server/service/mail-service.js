const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: 'lightfood.2024@mail.ru',
                pass: process.env.SMPT_PASS16
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:`<!doctype html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                    div{
                        background-color:#f0f0f0;
                        color:#92000A;
                        padding:15px;
                    }
                    h1{
                        color:#92000A; 
                    }
                </style>
              </head>

              <body>
              <h1>Для подтверждения почты перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
              </body>
            </html>`
        })
    }
}

module.exports = new MailService();