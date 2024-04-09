const notificationModel = require('../models/notificationModel');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    createNotification: async (body) => {
        try {
            const notificationId = uuidv4();
            const createNotification = await notificationModel.createNotification({ ...body, notificationId });
            if (createNotification.error) {
                return {
                    error: createNotification.error
                }
            }
            else {
                return {
                    response: createNotification.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getNotifications: async (body) => {
        try {
            const getNotifications = await notificationModel.getNotifications(body);
            if (getNotifications.error) {
                return {
                    error: getNotifications.error
                }
            }
            else {
                return {
                    response: getNotifications.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    deleteNotification: async (body) => {
        try {
            const deleteNotification = await notificationModel.deleteNotification(body);
            if (deleteNotification.error) {
                return {
                    error: deleteNotification.error
                }
            }
            else {
                return {
                    response: deleteNotification.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    markAsRead: async (body) => {
        try {
            const markAsRead = await notificationModel.markAsRead(body);
            if (markAsRead.error) {
                return {
                    error: markAsRead.error
                }
            }
            else {
                return {
                    response: markAsRead.response
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