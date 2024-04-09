const authService = require('../services/authService');
const joi = require('joi');
const mailer = require('./mailer');
const axios = require('axios');


const signupSchema = joi.object().keys({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
    repeatPassword: joi.ref('password'),
    isAdmin: joi.boolean()
})

const loginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
})

const otpSchema = joi.object().keys({
    email: joi.string().required(),
    code: joi.string().required().min(6),
})


module.exports = {
    signUp: async (req, res) => {
        try {
            const validate = await signupSchema.validateAsync(req.body)
            console.log(validate);
            const serviceResponse = await authService.signUp(validate);
            if (serviceResponse.response) {
                await axios.post('http://localhost:3000/auth/verifyEmail', { email: validate.email })
                res.status(201).send({
                    response: "User Signed up successfully! An OTP has been sent to your email, Please verify your email to login. "
                })
            }
            else {
                res.status(400).send({
                    error: serviceResponse.error
                })
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                error: err
            })
        }
    },
    logIn: async (req, res) => {
        try {
            const validate = await loginSchema.validateAsync(req.body)
            const serviceResponse = await authService.logIn(validate);
            if (serviceResponse.error?.errorCode === 403) {

                await axios.post('http://localhost:3000/auth/verifyEmail', { email: validate.email })
                return res.status(403).send({
                    error: serviceResponse.error?.message
                })
            }
            if (serviceResponse.error) {
                return res.status(400).send({
                    error: serviceResponse.error
                })
            }
            const cookies = { token: serviceResponse.response.dataValues.token }
            const hour = 60 * 60 * 1000
            res.cookie("auth", cookies, {
                maxAge: hour,
                httpOnly: true, // The cookie is only accessible by the web server not by JavaScript code. 
            })
            return res.status(200).send({
                response: serviceResponse.response
            })

        }
        catch (err) {
            console.log('err', err)
            return res.status(400).send({
                error: err
            })
        }
    },

    logOut: (req, res) => {
        try {
            console.log('req.body', req.body);
            const serviceResponse = authService.logOut();
            if (serviceResponse.response) {
                res.status(200).send({
                    response: serviceResponse.response
                })
            }
            else {
                res.status(400).send({
                    error: serviceResponse.error
                })
            }
        }
        catch (err) {
            res.status(400).send({
                error: err
            })
        }
    },
    generateOtp: async (req, res, next) => {
        try {
            const { email } = req.body;
            const validate = await joi.string().email().required().validateAsync(email);
            const serviceResponse = await authService.generateOtp(validate);
            if (serviceResponse.response) {
                next();
            }
            else {
                return res.status(400).send({
                    error: serviceResponse.error
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    },
    verifyOtp: async (req, res) => {
        try {
            const validate = await otpSchema.validateAsync(req.query);
            console.log('validate', validate);
            const verifyOtp = await authService.verifyOtp(validate);
            if (verifyOtp.response) {
                return res.status(200).send({
                    response: verifyOtp.response
                })
            }
            else {
                return res.status(400).send({
                    error: verifyOtp.error
                })
            }
        }
        catch (err) {
            res.status(400).send({
                error: err
            })
        }
    }

}