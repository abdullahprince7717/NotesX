
const { models } = require('../models/index');
module.exports = {
    getNotifications: async (body) => {
        try {
            return {
                response: await models.Notifications.findAll({
                    where: {
                        reciever_id: body.userId
                    }
                })
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    createNotification: async (body) => {
        try {
            return {
                response: await models.Notifications.create({
                    notification_id: body.notificationId,
                    sender_id: body.senderId,
                    reciever_id: body.recieverId,
                    note_id: body.note_id,
                    content: body.content,
                    type: body.type,
                    is_seen: false
                })
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
            return {
                response: await models.Notifications.destroy({
                    where: {
                        notification_id: body.notificationId
                    }
                })
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
            return {
                response: await models.Notifications.update({
                    is_seen: true
                }, {
                    where: {
                        notification_id: body.notificationId
                    }
                })
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    }


}