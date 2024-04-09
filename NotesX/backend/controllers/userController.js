// For Admin and Customer, Admin will be able to see all the users in the system and perform CRUD operations on the users.
// Customer will only be able to see their own profile and update their profile.
const userService = require('../services/userService');
const joi = require('joi');


const createSchema = joi.object().keys({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
    repeatPassword: joi.ref('password'),
    isAdmin: joi.boolean()
})

const updateSchema = joi.object().keys({
    userId: joi.string().required(),
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    password: joi.string().required().min(8),
})

const deleteSchema = joi.object().keys({
    userId: joi.string().required(),
})
module.exports = {
    createUser: async (req, res) => {
        try {
            const validate = await createSchema.validateAsync(req.body)
            console.log(validate);
            const createUser = await userService.createUser(validate);

            if (createUser.error) {
                return res.status(400).send({
                    error: createUser.error
                })
            }
            else {
                return res.status(201).send({
                    response: createUser.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },
    getUsers: async (req, res) => {
        try {
            const getUsers = await userService.getUsers();

            if (getUsers.error) {
                return res.status(400).send({
                    error: getUsers.error

                })
            }
            else {
                return res.status(200).send({
                    response: getUsers.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    },

    getUserById: async (req, res) => {
        try {
            const validate = await deleteSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getUserById = await userService.getUserById(validate);

            if (getUserById.error) {
                return res.status(400).send({
                    error: getUserById.error

                })
            }
            else {
                return res.status(200).send({
                    response: getUserById.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    updateUser: async (req, res) => {
        try {
            const validate = await updateSchema.validateAsync(req.body)
            console.log(validate);
            const updateUser = await userService.updateUser(validate);

            if (updateUser.error) {
                return res.status(400).send({
                    error: updateUser.error

                })
            }
            else {
                return res.status(200).send({
                    response: updateUser.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const validate = await deleteSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const deleteUser = await userService.deleteUser(validate);

            if (deleteUser.error) {
                return res.status(400).send({
                    error: deleteUser.error

                })
            }
            else {
                return res.status(200).send({
                    response: deleteUser.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    }

}