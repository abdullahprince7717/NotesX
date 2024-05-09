const notificationModel = require('../models/notificationModel');
const userModel = require('../models/userModel');
const noteModel = require('../models/noteModel');
const mailer = require('../controllers/mailer');
const initSocket = require('../bin/socketManager');
const { v4: uuidv4 } = require('uuid');

const { io } = initSocket();
module.exports = {
    createNotification: async (body) => {
        try {
            const notificationId = uuidv4();
            console.log("body", body);
            const { senderId, recieverId, noteId } = body;
            const sender = await userModel.getUserById({ userId: senderId });
            const reciever = await userModel.getUserById({ userId: recieverId });
            const note = await noteModel.getNoteById({ noteId });

            const { error: senderError, response: senderResponse } = sender;
            const { error: recieverError, response: recieverResponse } = reciever;
            const { error: noteError, response: noteResponse } = note;

            if (senderError || recieverError) {
                return {
                    error: senderError || recieverError
                }
            }

            else if (!senderResponse || !recieverResponse) {
                return {
                    error: 'User not found'
                }
            }

            else if (noteError) {
                return {
                    error: noteError
                }
            }

            const { first_name: senderFirstName, last_name: senderLastName } = senderResponse;
            const { first_name: recieverFirstName, last_name: recieverLastName } = recieverResponse;
            const { note_title } = noteResponse;

            const { type } = body;

            if (type === 'addCollaborator') {
                body.content = `${recieverFirstName} ${recieverLastName} , You have been added as a collaborator by ${senderFirstName} ${senderLastName} to ${note_title}`;
            }
            else if (type === 'removeCollaborator') {
                body.content = `${recieverFirstName} ${recieverLastName} , You have been removed as a collaborator by ${senderFirstName} ${senderLastName} to ${note_title}`;
            }
            else if (type === 'newCollaborator') {
                body.content = `${recieverFirstName} ${recieverLastName} , A new collaborator has been added to a note by ${senderFirstName} ${senderLastName} to ${note_title}`;
            }
            else if (type === 'updateNote') {
                body.content = `${recieverFirstName} ${recieverLastName} , ${note_title} has been updated by ${senderFirstName} ${senderLastName}`;
            }
            else if (type === 'deleteNote') {
                body.content = `${recieverFirstName} ${recieverLastName} ,${note_title} has been deleted by ${senderFirstName} ${senderLastName}, You have been removed as a collaborator from this note`;
            }
            else {
                body.content = `${recieverFirstName} ${recieverLastName} ,You have a new notification`;
            }
            const createNotification = await notificationModel.createNotification({ ...body, notificationId });

            if (createNotification.error) {
                return {
                    error: createNotification.error
                }
            }
            else {
                await mailer.customEmail(recieverId, type, body.content);
                io.emit(type, body.content);
                console.log("notification created");
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
    },
    // sendReminderNotifications: async () => {
    //     try {
    //         const notifications = await notificationModel.getNotifications({ userId: null });
    //         const { response } = notifications;
    //         if (response.length > 0) {
    //             response.forEach(async (notification) => {
    //                 const { reciever_id, note_id } = notification;
    //                 const note = await noteModel.getNoteById({ noteId: note_id });
    //                 const { response: noteResponse } = note;
    //                 if (noteResponse) {
    //                     const { note_title, reminder } = noteResponse;
    //                     if (reminder) {
    //                         const reciever = await userModel.getUserById({ userId: reciever_id });
    //                         const { response: recieverResponse } = reciever;
    //                         if (recieverResponse) {
    //                             const { email } = recieverResponse;
    //                             await mailer.customEmail(reciever_id, 'reminder', `Reminder for ${note_title}`);
    //                         }
    //                     }
    //                 }
    //             })
    //         }
    //         return {
    //             response: 'Reminder notifications sent'
    //         }
    //     }
    //     catch (err) {
    //         return {
    //             error: err,
    //         }
    //     }
    // }

}