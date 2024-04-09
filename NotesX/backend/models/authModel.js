
const { models } = require('../models/index');
const Users = require('../models/userModel')
const config = require('../config.json')
module.exports = {
    signUp: async (body) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Users.create({
                        user_id: body.userId,
                        first_name: body.firstName,
                        last_name: body.lastName,
                        email: body.email,
                        password: body.password,
                        is_admin: body.isAdmin
                    }),
                }
            }
            else {
                return {
                    response: await Users.create({
                        user_id: body.userId,
                        first_name: body.firstName,
                        last_name: body.lastName,
                        email: body.email,
                        password: body.password
                    }),
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    logIn: async (email) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Users.findOne({
                        where: {
                            email: email,
                        }
                    })
                }
            }
            else {
                return {
                    response: await Users.findOne({
                        email: email,
                    })
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
            return {
                response: "User logged out",
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    }


}