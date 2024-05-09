
const nodemailer = require("nodemailer");
const joi = require('joi');
const Mailgen = require('mailgen');
const userModel = require('../models/userModel');

const userSchema = joi.object().keys({
    email: joi.string().email().required()
})


const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "abdullah.akhtar@piecyfer.com",
        pass: "n5SgzAR66i7E",
    },
});

const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
    }

});


module.exports = {
    verifyEmail: async (req, res) => {
        try {
            const validate = await userSchema.validateAsync(req.body)
            const { email } = validate;
            const user = await userModel.getUserByEmail(email);
            const { first_name, last_name, otp } = user.response.dataValues
            let emailTemplate = {
                body: {
                    name: first_name + ' ' + last_name,
                    intro: `Welcome to NotesX! We\'re very excited to have you on board. Heres your OTP : ${otp}`,
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }
            let emailBody = MailGenerator.generate(emailTemplate);

            let message = {
                from: 'abdullah.akhtar@piecyfer.com',
                to: email,
                subject: 'Welcome to NotesX',
                html: emailBody
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        error: err,
                        message: 'Email not sent'
                    })
                } else {
                    console.log(info);
                    res.status(200).send({
                        message: 'Email sent successfully',
                        response: info
                    })
                }
            });
        } catch (error) {
            return res.status(400).send({
                error: error,
            })
        }
    },
    onBoardEmail: async (body) => {
        try {
            console.log("body in mailer ", body)
            let emailTemplate = {
                body: {
                    name: body.firstName + ' ' + body.lastName,
                    intro: "Welcome to NotesX! We\'re very excited to have you on board",
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }
            let emailBody = MailGenerator.generate(emailTemplate);

            let message = {
                from: 'abdullah.akhtar@piecyfer.com',
                to: body.email,
                subject: 'Welcome to NotesX',
                html: emailBody
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    return ({
                        error: err,
                        message: 'Email not sent'
                    })
                } else {
                    console.log(info);
                    return ({
                        message: 'Email sent successfully',
                        response: info
                    })
                }
            });
        } catch (error) {
            return ({
                error: error,
            })
        }
    },

    customEmail: async (userId, subject, emailContent) => {
        try {
            const user = await userModel.getUserById({ userId });
            const { first_name, last_name, email } = user.response.dataValues;
            let emailTemplate = {
                body: {
                    name: first_name + ' ' + last_name,
                    intro: emailContent,
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }
            let emailBody = MailGenerator.generate(emailTemplate);
            let message = {
                from: 'abdullah.akhtar@piecyfer.com',
                to: email,
                subject: subject,
                html: emailBody
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    return ({
                        error: err,
                        message: 'Email not sent'
                    })
                } else {
                    console.log(info);
                    return ({
                        message: 'Email sent successfully',
                        response: info
                    })
                }
            });
        } catch (error) {
            return ({
                error: error,
            })
        }
    }
}




