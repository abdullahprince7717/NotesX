const notificationService = require('../services/notificationService');
const joi = require('joi');
// const cron = require('node-cron');

const createSchema = joi.object().keys({
    senderId: joi.string().required(),
    recieverId: joi.string().required(),
    type: joi.string().required(),
    noteId: joi.string().required()
})

const deleteSchema = joi.object().keys({
    notificationId: joi.string().required(),
})

const getSchema = joi.object().keys({
    userId: joi.string().required(),
})

const markAsReadSchema = joi.object().keys({
    notificationId: joi.string().required(),
})

// async function handleReminderNotifications() {
//     try {
//         await notificationService.sendReminderNotifications();
//     } catch (error) {
//         console.error('Error sending reminder notifications:', error);
//     }
// }

// // Schedule the job to run every 5 minutes (adjust as needed)
// const job = cron.schedule('*/5 * * * *', handleReminderNotifications);

// // Start the job immediately (optional)
// job.start();


module.exports = {
    createNotification: async (req, res) => {
        try {
            const validate = await createSchema.validateAsync(req.body)
            const createNotification = await notificationService.createNotification(validate);

            if (createNotification.error) {
                console.log(createNotification.error)
                return res.status(400).send({
                    error: createNotification.error

                })
            }
            else {
                return res.status(200).send({
                    response: createNotification.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    },
    getNotifications: async (req, res) => {
        try {
            const validate = await getSchema.validateAsync({ userId: req.params.userId });
            const getNotifications = await notificationService.getNotifications(validate);
            if (getNotifications.error) {
                return res.status(400).send({
                    error: getNotifications.error

                })
            }
            else {
                return res.status(200).send({
                    response: getNotifications.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    },
    deleteNotification: async (req, res) => {
        try {
            const validate = await deleteSchema.validateAsync({ notificationId: req.params.notificationId })
            const deleteNotification = await notificationService.deleteNotification(validate);

            if (deleteNotification.error) {
                return res.status(400).send({
                    error: deleteNotification.error

                })
            }
            else {
                return res.status(200).send({
                    response: deleteNotification.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    },
    markAsRead: async (req, res) => {
        try {
            const validate = await markAsReadSchema.validateAsync({ notificationId: req.params.notificationId })
            const markAsRead = await notificationService.markAsRead(validate);

            if (markAsRead.error) {
                return res.status(400).send({
                    error: markAsRead.error

                })
            }
            else {
                return res.status(200).send({
                    response: markAsRead.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err
            })
        }
    }

}