const jwt = require('jsonwebtoken');
const sessionModel = require('../models/sessionModel');
const userModel = require('../models/userModel');
const config = require('../config.json');

module.exports = {
    client: async (req, res, next) => {
        try {
            const token = req.cookies.auth.token;
            const decoded = jwt.decode(token);
            console.log("decoded", decoded)
            jwt.verify(token, config.jwt.secret, async (error) => {
                if (error) {

                    return res.status(400).send({
                        error: error,
                    });
                }
                // const user = await userModel.getUserById({ userId: decoded?.user_id });
                // if (user.response.dataValues.is_admin) {
                //     return res.status(403).send({
                //         error: "Admin cannot access client routes",
                //     });
                // }
                const session = await sessionModel.getSession(decoded?.user_id, token);
                // console.log("session", session);
                if (session.error || !session.response) {
                    return res.status(401).send({
                        error: "unauthorized user",
                    });
                }
                next();
            });
        } catch (error) {
            console.log("error", error)
            return res.status(401).send({
                error: "Invalid request or unauthorized user",
            });
        }
    },

    admin: (req, res, next) => {
        try {
            const token = req.cookies.auth.token;
            const decoded = jwt.decode(token);
            console.log("decoded", decoded)
            jwt.verify(token, config.jwt.secret, async (error) => {
                if (error) {
                    return res.status(400).send({
                        error: error,
                    });
                }
                const user = await userModel.getUserById({ userId: decoded.user_id });
                if (user.error || !user.response || !user.response.is_admin) {
                    return res.status(403).send({
                        error: "Client cannot access admin routes",
                    });
                }
                const session = await sessionModel.getSession(req.body.userId || decoded.user_id, token);
                console.log("session", session);
                if (session.error || !session.response) {
                    return res.status(401).send({
                        error: "unauthorized user",
                    });
                }
                next();
            });
        } catch (error) {
            return res.status(401).send({
                error: "Invalid request or unauthorized user",
            });
        }
    },
    localVariables: (req, res, next) => {
        req.app.locals = {
            OTP: null,
            email: null,
            expiresAt: null,
        }
        next();
    }
};