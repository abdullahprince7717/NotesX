
const { models } = require('../models/index');
const Users = require('./mongoModels/users')
const config = require('../config.json')
module.exports = {
    createUser: async (body) => {
        try {
            console.log("body", body)
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
                        _id: body.userId,
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
    getUsers: async () => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Users.findAll()
                }
            }
            else {
                return {
                    response: await Users.find()
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getUserById: async ({ userId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Users.findOne({
                        where: {
                            user_id: userId,
                        }
                    })
                }
            }
            else {
                return {
                    response: await Users.findOne({
                        _id: userId,
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

    updateUser: async (body) => {
        try {
            if (config.database == 'postgres') {
                console.log("body", body)
                const updateUser = await models.Users.update({
                    first_name: body.firstName,
                    last_name: body.lastName,
                    email: body.email,
                    password: body.password,
                    email_verified_at: body.emailVerifiedAt,
                    otp: body.otp,
                    otp_expiry: body.otpExpiry
                }, {
                    where: {
                        user_id: body.userId
                    }
                });
                return {
                    response: {
                        response: updateUser,
                        message: updateUser != 0 ? "Updated User Successfully" : "User not found"
                    }
                };
            }
            else {
                const updateUser = await Users.findOneAndUpdate({
                    _id: body.userId
                }, {
                    first_name: body.firstName,
                    last_name: body.lastName,
                }, {
                    returnOriginal: false
                });
                return {
                    response: {
                        response: updateUser,
                        message: updateUser != 0 ? "Updated User Successfully" : "User not found"
                    }
                };
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },

    updateUserbyEmail: async (body) => {
        try {
            console.log("body:", body)
            if (config.database == 'postgres') {
                const updateUser = await models.Users.update({
                    first_name: body.firstName,
                    last_name: body.lastName,
                    password: body.password,
                    email_verified_at: body.emailVerifiedAt,
                    otp: body.otp,
                    otp_expiry: body.otpExpiry
                }, {
                    where: {
                        email: body.email
                    }
                });
                return {
                    response: {
                        response: updateUser,
                        message: updateUser != 0 ? "Updated User Successfully" : "User not found"
                    }
                };
            }
            else {
                const updateUser = await Users.findOneAndUpdate({
                    email: body.email
                }, {
                    first_name: body.firstName,
                    last_name: body.lastName,
                }, {
                    returnOriginal: false
                });
                return {
                    response: {
                        response: updateUser,
                        message: updateUser != 0 ? "Updated User Successfully" : "User not found"
                    }
                };
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },
    deleteUser: async ({ userId }) => {
        try {
            if (config.database == 'postgres') {
                const deleteUser = await models.Users.destroy({
                    where: {
                        user_id: userId,
                    }
                })
                return {
                    response: {
                        response: deleteUser,
                        message: deleteUser != 0 ? "User deleted successfully" : "User not found"
                    }
                }
            }
            else {
                const deleteUser = await Users.deleteOne({
                    _id: userId,
                })
                return {
                    response: {
                        response: deleteUser,
                        message: deleteUser != 0 ? "User deleted successfully" : "User not found"
                    }
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getUserByEmail: async (email) => {    // to check if email already exists and will also be used in login
        try {
            if (config.database == 'postgres') {
                const getUserByEmail = await models.Users.findOne({
                    where: {
                        email: email
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    },
                })
                return {
                    response: getUserByEmail
                }
            }
            else {
                const getUserByEmail = await Users.findOne({
                    email: email
                })
                return {
                    response: getUserByEmail
                }
            }
        }
        catch (error) {
            return {
                error: error
            }
        }
    },


}