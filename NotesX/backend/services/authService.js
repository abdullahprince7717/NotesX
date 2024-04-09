const authModel = require('../models/authModel');
const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
const mailer = require('../controllers/mailer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const otpGenerator = require('otp-generator');

module.exports = {
    signUp: async (body) => {
        try {
            delete body.repeatPassword;
            const userId = uuidv4();
            body.password = await bcrypt.hash(body.password, 10)

            const userExists = await userModel.getUserByEmail(body.email);
            console.log("userExists", userExists);

            if (userExists.response) {
                return {
                    error: "User already exists",
                }
            }

            const signUpResponse = await authModel.signUp({ ...body, userId });
            if (signUpResponse) {
                return {
                    response: signUpResponse.response,
                }
            }
            else {
                return {
                    error: signUpResponse.error,
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    logOut: () => {
        try {
            const logOutResponse = authModel.logOut();
            if (logOutResponse) {
                return {
                    response: logOutResponse.response,
                }
            }
            else {
                return {
                    error: logOutResponse.error,
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    }, logIn: async (body) => {
        try {
            const logInResponse = await userModel.getUserByEmail(body.email)
            if (logInResponse.error || !logInResponse.response) {
                return {
                    error: logInResponse.error || "Invalid Credentials",
                }
            }
            if (!logInResponse.response.email_verified_at) {
                return {
                    error: {
                        message: "Email not verified, An OTP has been sent to your email. Please verify your email to login.",
                        errorCode: 403
                    }
                }
            }
            const logIn = await bcrypt.compare(body.password, logInResponse.response.password);
            console.log("login", logIn)
            if (!logIn) {
                return {
                    error: "Invalid credentials",
                }
            }

            delete logInResponse.response.dataValues.password;

            const token = jwt.sign(logInResponse.response.dataValues, config.jwt.secret)
            const session = await sessionModel.getSessionByUserId(
                logInResponse.response.dataValues.user_id
            );
            if (session) {
                await sessionModel.deleteSession(logInResponse.response.dataValues.user_id);
            }

            const sessonId = uuidv4();
            const createdSession = await sessionModel.createSession(
                token,
                logInResponse.response.dataValues.user_id,
                sessonId,
            );

            return {
                response: createdSession.response,
            }

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    generateOtp: async (email) => {
        try {
            const userExists = await userModel.getUserByEmail(email);
            console.log("userExists", userExists);
            if (userExists.response) {
                if (userExists.response.dataValues.email_verified_at) {
                    return ({
                        error: 'Email already verified'
                    })
                }
                else {
                    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                    const otpExpiry = new Date().getTime() + 600000; // 60 minutes
                    const otpResponse = await userModel.updateUserbyEmail({ email: email, otp, otpExpiry });
                    if (otpResponse.response) {
                        return ({
                            response: 'OTP generated'
                        })
                    }
                    else {
                        return ({
                            error: otpResponse.error
                        })
                    }
                }
            }
            else {
                return ({
                    error: 'User not found, Please sign up first'
                })
            }
        } catch (error) {
            return ({
                error: error
            })
        }
    },
    verifyOtp: async (body) => {
        try {
            const userExists = await userModel.getUserByEmail(body.email);
            if (userExists.response) {
                const { email, otp, otp_expiry } = userExists.response.dataValues;
                if (parseInt(otp) === parseInt(body.code) && body.email == email) {
                    const currentTime = new Date().getTime();
                    if (currentTime > otp_expiry) {
                        return ({
                            error: 'OTP expired'
                        })
                    }
                    else {
                        await userModel.updateUserbyEmail({ email: body.email, emailVerifiedAt: currentTime, otp: null, otpExpiry: null });
                        return ({
                            response: 'OTP verified successfully'
                        })
                    }
                }
                else {
                    return ({
                        error: 'Invalid OTP'
                    })
                }
            }
            else {
                return ({
                    error: 'User not found, Please sign up first'
                })
            }

        } catch (error) {
            return ({
                error: error
            })
        }
    }
}