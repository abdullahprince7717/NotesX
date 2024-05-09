const noteModel = require('../models/noteModel');
const userModel = require('../models/userModel');
const notificationService = require('./notificationService');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createNote: async (body) => {
        try {
            const noteId = uuidv4();
            const noteCollaboratorId = uuidv4();
            const noteVersionId = uuidv4();
            const createNote = await noteModel.createNote({ ...body, noteId, noteCollaboratorId, noteVersionId });
            if (createNote.error) {
                return {
                    error: createNote.error
                }
            }
            else {
                return createNote;
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getNotes: async (query) => {
        try {
            if (!query.pageNo) {
                query.pageNo = 1;
            }
            const offset = (query.pageNo - 1) * query.limit; // records to skip
            const getNotes = await noteModel.getNotes(offset, query);
            if (getNotes.error) {
                return {
                    error: getNotes.error
                }
            }
            else {
                return {
                    response: getNotes.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getNotesByUserId: async (userId) => {
        try {
            const getNotesByUserId = await noteModel.getNotesByUserId(userId);
            if (getNotesByUserId.error) {
                return {
                    error: getNotesByUserId.error
                }
            }
            else {
                return {
                    response: getNotesByUserId.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    updateNote: async (body) => {
        try {
            const noteVersionId = uuidv4();
            const verifyOwner = await noteModel.verifyOwner({ noteId: body.noteId, ownerId: body.userId });
            if (!verifyOwner.response) {
                return {
                    error: "Only the owner of the note can update the note."
                }
            }
            const updateNote = await noteModel.updateNote({ ...body, noteVersionId });
            if (updateNote.error) {
                return {
                    error: updateNote.error
                }
            }
            else {
                await updateNote.response.updateNote.Note_Collaborators.forEach(async (element) => {
                    await notificationService.createNotification({
                        senderId: body.userId,
                        recieverId: element.dataValues.user_id,
                        noteId: body.noteId,
                        type: 'updateNote'
                    })
                });
                return {
                    response: updateNote.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    addCollaborator: async (body) => {
        try {
            const getUserbyEmail = await userModel.getUserByEmail(body.email);
            if (getUserbyEmail.error) {
                return {
                    error: getUserbyEmail.error
                }
            }
            else if (!getUserbyEmail.response) {
                return {
                    error: "User not found."
                }
            }
            body.userId = getUserbyEmail.response.dataValues.user_id;
            const verifyOwner = await noteModel.verifyOwner(body);
            const verifyCollaborator = await noteModel.verifyCollaborator(body);
            if (!verifyOwner.response) {
                return {
                    error: "Only the owner of the note can add collaborators."
                }
            }
            else if (body.userId == body.ownerId) {
                return {
                    error: "You cannot add yourself as Collaborator."
                }
            }
            else if (verifyCollaborator && body.userId == verifyCollaborator?.response?.dataValues?.user_id) {
                return {
                    error: "User is already a collaborator."
                }
            }

            const noteCollaboratorId = uuidv4();
            const addCollaborator = await noteModel.addCollaborator({ ...body, noteCollaboratorId });
            if (addCollaborator.error) {
                return {
                    error: addCollaborator.error
                }
            }
            else {
                return {
                    response: addCollaborator.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    removeCollaborator: async (body) => {
        try {
            const getUserbyEmail = await userModel.getUserByEmail(body.email);
            if (getUserbyEmail.error) {
                return {
                    error: getUserbyEmail.error
                }
            }
            else if (!getUserbyEmail.response) {
                return {
                    error: "User not found."
                }
            }
            body.userId = getUserbyEmail.response.dataValues.user_id;
            const verifyOwner = await noteModel.verifyOwner(body);
            const verifyCollaborator = await noteModel.verifyCollaborator(body);
            if (!verifyOwner.response) {
                return {
                    error: "Only the owner of the note can remove collaborators."
                }
            }
            else if (body.userId == body.ownerId) {
                return {
                    error: "You cannot remove yourself as Collaborator."
                }
            }
            else if (!verifyCollaborator) {
                return {
                    error: "User is not a collaborator."
                }
            }
            const removeCollaborator = await noteModel.removeCollaborator(body);
            if (removeCollaborator.error) {
                return {
                    error: removeCollaborator.error
                }
            }
            else {
                return {
                    response: { ...removeCollaborator.response, userId: body.userId }
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getAllCollaborators: async (noteId) => {
        try {
            console.log(noteId);
            const getAllCollaborators = await noteModel.getAllCollaborators(noteId);
            if (getAllCollaborators.error) {
                return {
                    error: getAllCollaborators.error
                }
            }
            else {
                return {
                    response: getAllCollaborators.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    deleteNote: async (noteId) => {
        try {
            const deleteNote = await noteModel.deleteNote(noteId);
            await deleteNote.noteCollaborators.forEach(async (element) => {
                await notificationService.createNotification({
                    senderId: deleteNote?.deleteNote?.dataValues?.user_id,
                    recieverId: element.dataValues.user_id,
                    noteId: noteId.noteId,
                    type: 'deleteNote'
                })
            });
            if (deleteNote.error) {
                return {
                    error: deleteNote.error
                }
            }
            else {
                return {
                    response: deleteNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    pinNote: async (noteId) => {
        try {
            const pinNote = await noteModel.pinNote(noteId);
            if (pinNote.error) {
                return {
                    error: pinNote.error
                }
            }
            else {
                return {
                    response: pinNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unPinNote: async (noteId) => {
        try {
            const unPinNote = await noteModel.unPinNote(noteId);
            if (unPinNote.error) {
                return {
                    error: unPinNote.error
                }
            }
            else {
                return {
                    response: unPinNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    archiveNote: async (noteId) => {
        try {
            const archiveNote = await noteModel.archiveNote(noteId);
            if (archiveNote.error) {
                return {
                    error: archiveNote.error
                }
            }
            else {
                return {
                    response: archiveNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unArchiveNote: async (noteId) => {
        try {
            const unArchiveNote = await noteModel.unArchiveNote(noteId);
            if (unArchiveNote.error) {
                return {
                    error: unArchiveNote.error
                }
            }
            else {
                return {
                    response: unArchiveNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    trashNote: async (noteId) => {
        try {
            const trashNote = await noteModel.trashNote(noteId);
            if (trashNote.error) {
                return {
                    error: trashNote.error
                }
            }
            else {
                return {
                    response: trashNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unTrashNote: async (noteId) => {
        try {
            const unTrashNote = await noteModel.unTrashNote(noteId);
            if (unTrashNote.error) {
                return {
                    error: unTrashNote.error
                }
            }
            else {
                return {
                    response: unTrashNote
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getCollaboratedNotes: async (userId) => {
        try {
            const getCollaboratedNotes = await noteModel.getCollaboratedNotes(userId);
            if (getCollaboratedNotes.error) {
                return {
                    error: getCollaboratedNotes.error
                }
            }
            else {
                return {
                    response: getCollaboratedNotes.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getArchivedNotes: async (userId) => {
        try {
            const getArchivedNotes = await noteModel.getArchivedNotes(userId);
            if (getArchivedNotes.error) {
                return {
                    error: getArchivedNotes.error
                }
            }
            else {
                return {
                    response: getArchivedNotes.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getPinnedNotes: async (userId) => {
        try {
            const getPinnedNotes = await noteModel.getPinnedNotes(userId);
            if (getPinnedNotes.error) {
                return {
                    error: getPinnedNotes.error
                }
            }
            else {
                return {
                    response: getPinnedNotes.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getTrashedNotes: async (userId) => {
        try {
            const getTrashedNotes = await noteModel.getTrashedNotes(userId);
            if (getTrashedNotes.error) {
                return {
                    error: getTrashedNotes.error
                }
            }
            else {
                return {
                    response: getTrashedNotes.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    addReminder: async (body) => {
        try {
            const addReminder = await noteModel.addReminder(body);
            if (addReminder.error) {
                return {
                    error: addReminder.error
                }
            }
            else {
                return {
                    response: addReminder.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    removeReminder: async (body) => {
        try {
            const removeReminder = await noteModel.removeReminder(body);
            if (removeReminder.error) {
                return {
                    error: removeReminder.error
                }
            }
            else {
                return {
                    response: removeReminder.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getReminders: async (userId) => {
        try {
            const getReminders = await noteModel.getReminders(userId);
            if (getReminders.error) {
                return {
                    error: getReminders.error
                }
            }
            else {
                return {
                    response: getReminders.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    // createNoteVersion: async (body) => {
    //     try {
    //         const noteVersionId = uuidv4();
    //         const createNoteVersion = await noteModel.createNoteVersion({ ...body, noteVersionId });
    //         if (createNoteVersion.error) {
    //             return {
    //                 error: createNoteVersion.error
    //             }
    //         }
    //         else {
    //             return {
    //                 response: createNoteVersion.response
    //             }
    //         }
    //     }
    //     catch (err) {
    //         return {
    //             error: err,
    //         }
    //     }
    // },

    getNoteVersionHistory: async (noteId) => {
        try {
            const getNoteVersionHistory = await noteModel.getNoteVersionHistory(noteId);
            if (getNoteVersionHistory.error) {
                return {
                    error: getNoteVersionHistory.error
                }
            }
            else {
                return {
                    response: getNoteVersionHistory.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getUpcomingReminders: async () => {
        try {
            const threshold = new Date();
            threshold.setMinutes(threshold.getMinutes() + 5); // Check for reminders within the next 5 minutes (adjust as needed)
            const getUpcomingReminders = await noteModel.getUpcomingReminders();
            console.log("threshold", threshold);
            console.log("getUpcomingReminders", getUpcomingReminders);
            if (getUpcomingReminders.error) {
                return {
                    error: getUpcomingReminders.error
                }
            }
            else {
                return {
                    response: getUpcomingReminders.response
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