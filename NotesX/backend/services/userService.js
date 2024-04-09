const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
module.exports = {
    createUser: async (body) => {
        try {
            const userId = uuidv4();
            body.password = await bcrypt.hash(body.password, 10)
            const createUser = await userModel.createUser({ ...body, userId })

            if (createUser.error) {
                return {
                    error: createUser.error
                }
            }
            else {
                return {
                    response: createUser.response
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
            const getUsers = await userModel.getUsers()

            if (getUsers.error) {
                return {
                    error: getUsers.error
                }
            }
            else {
                return {
                    response: getUsers.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getUserById: async (userId) => {
        try {
            const getUserById = await userModel.getUserById(userId)

            if (getUserById.error) {
                return {
                    error: getUserById.error
                }
            }
            else {
                return {
                    response: getUserById.response
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
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 10)
            }
            const updateUser = await userModel.updateUser(body)
            if (updateUser.error) {
                return {
                    error: updateUser.error
                }
            }
            else {
                return {
                    response: updateUser.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    deleteUser: async (userId) => {
        try {
            const deleteUser = await userModel.deleteUser(userId)

            if (deleteUser.error) {
                return {
                    error: deleteUser.error
                }
            }
            else {
                return {
                    response: deleteUser.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    }

}