const { models } = require('../models/index');
const Sessions = require('./mongoModels/session')
const config = require('../config.json')

module.exports = {
    createSession: async (token, userId, sessionId) => {
        try {
            if (config.database == 'postgres') {
                const user = await models.Users.findOne({
                    where: {
                        user_id: userId,
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
                console.log("User", user);

                const createSession = await models.Session.create({
                    session_id: sessionId,
                    token,
                    user_id: userId,
                })
                return {
                    response: { createSession, user }
                }
            }
            else {
                return {
                    response: await Sessions.create({
                        _id: sessionId,
                        token,
                        user_id: userId,
                    }),
                }
            }
        }
        catch (err) {
            console.log("Create Error", err);
            return {
                error: err
            }
        }
    },
    getSession: async (userId, token) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Session.findOne({
                        where: {
                            user_id: userId,
                            token: token,
                        },
                    }),
                }
            }
            else {
                return {
                    response: await Sessions.findOne({
                        user_id: userId,
                        token: token,
                    }),
                }
            }
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getSessionByUserId: async (userId) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Session.findOne({
                        where: {
                            user_id: userId
                        }
                    })
                }
            }
            else {
                return {
                    response: await Sessions.findOne({
                        user_id: userId
                    })
                }
            }
        }
        catch (err) {
            return {
                error: err
            }
        }
    },
    deleteSession: async (userId) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Session.destroy({
                        where: {
                            user_id: userId
                        }
                    })
                }
            }
            else {
                return {
                    response: await Sessions.deleteOne({
                        user_id: userId
                    })
                }
            }
        }
        catch (err) {
            return {
                error: err
            }
        }
    }
}