const noteService = require('../services/noteService');
const joi = require('joi');
const notificationService = require('../services/notificationService');

const createSchema = joi.object().keys({
    noteTitle: joi.string().required(),
    noteDescription: joi.string().required(),
    noteImage: joi.string().allow(''),
    userId: joi.string().required(),
    isPinned: joi.boolean(),
    isArchived: joi.boolean(),
    isTrashed: joi.boolean(),
    reminder: joi.string().allow(''),
    reminderStatus: joi.boolean(),
})

const updateSchema = joi.object().keys({
    noteId: joi.string().required(),
    noteTitle: joi.string().required(),
    noteDescription: joi.string().required(),
    noteImage: joi.string().allow(''),
    userId: joi.string().required(),
    isPinned: joi.boolean(),
    isArchived: joi.boolean(),
    isTrashed: joi.boolean(),
    reminder: joi.string().allow(''),
    reminderStatus: joi.boolean(),
})

const getNotesByUserIdSchema = joi.object().keys({
    userId: joi.string().required(),
})

const deleteNoteSchema = joi.object().keys({
    noteId: joi.string().required(),
})
const addCollaboratorSchema = joi.object().keys({
    ownerId: joi.string().required(),
    email: joi.string().email().required(),
    // userId: joi.string().required(),
    noteId: joi.string().required(),
})

const paginationSchema = joi.object().keys({
    pageNo: joi.number().positive().greater(0),
    limit: joi.number().valid(),
    sortValue: joi.string().valid('note_title', 'createdAt', "updatedAt"), // enum value 
    sortOrder: joi.string().valid('ASC', 'DESC'),
    searchQuery: joi.string(),
})

const reminderSchema = joi.object().keys({
    noteId: joi.string().required(),
    reminder: joi.date().required(),
})

module.exports = {
    createNote: async (req, res) => {
        try {
            const validate = await createSchema.validateAsync(req.body)
            console.log(validate);
            const createNote = await noteService.createNote(validate);

            if (createNote.error) {
                console.log(createNote.error)
                return res.status(400).send({
                    error: createNote.error

                })
            }
            else {
                return res.status(201).send(createNote)
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },
    getNotes: async (req, res) => {
        try {
            const validate = await paginationSchema.validateAsync(req.query);
            console.log(validate);
            const getNotes = await noteService.getNotes(validate);
            if (getNotes.error) {
                console.log(getNotes.error)
                return res.status(400).send({
                    error: getNotes.error

                })
            }
            else {
                return res.status(200).send({
                    response: getNotes.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getNotesByUserId: async (req, res) => {
        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getNotesByUserId = await noteService.getNotesByUserId(validate);

            if (getNotesByUserId.error) {
                return res.status(400).send({
                    error: getNotesByUserId.error

                })
            }
            else {
                return res.status(200).send({
                    response: getNotesByUserId.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    updateNote: async (req, res) => {
        try {
            const validate = await updateSchema.validateAsync(req.body)
            console.log(validate);
            const updateNote = await noteService.updateNote(req.body);

            if (updateNote.error) {
                console.log(updateNote.error)
                return res.status(400).send({
                    error: updateNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: updateNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    addCollaborator: async (req, res) => {
        try {
            const validate = await addCollaboratorSchema.validateAsync(req.body)
            console.log(validate);
            const addCollaborator = await noteService.addCollaborator(validate);
            const userId = addCollaborator?.response?.response?.dataValues?.user_id;
            if (addCollaborator.error) {
                return res.status(400).send({
                    error: addCollaborator.error
                })
            }
            else {
                await notificationService.createNotification({
                    senderId: validate.ownerId,
                    recieverId: userId,
                    noteId: validate.noteId,
                    type: 'addCollaborator'
                })

                return res.status(201).send({
                    response: addCollaborator.response
                })
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).send({
                error: err,
            })
        }
    },
    removeCollaborator: async (req, res) => {
        try {
            const validate = await addCollaboratorSchema.validateAsync(req.body)
            console.log(validate);
            const removeCollaborator = await noteService.removeCollaborator(validate);
            const userId = removeCollaborator?.response?.userId;
            if (removeCollaborator.error) {
                return res.status(400).send({
                    error: removeCollaborator.error

                })
            }
            else {
                await notificationService.createNotification({
                    senderId: validate.ownerId,
                    recieverId: userId,
                    noteId: validate.noteId,
                    type: 'removeCollaborator'
                })
                return res.status(200).send({
                    response: removeCollaborator.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getAllCollaborators: async (req, res) => {
        try {
            const noteId = await joi.string().required().validateAsync(req.params.noteId);
            const getAllCollaborators = await noteService.getAllCollaborators(noteId);
            if (getAllCollaborators.error) {
                console.log(getAllCollaborators.error)
                return res.status(400).send({
                    error: getAllCollaborators.error

                })
            }
            else {
                return res.status(200).send({
                    response: getAllCollaborators.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    deleteNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })
            console.log(validate);
            const deleteNote = await noteService.deleteNote(validate);

            if (deleteNote.error) {
                return res.status(400).send({
                    error: deleteNote.error
                })
            }
            else {
                return res.status(200).send({
                    response: deleteNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },
    pinNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const pinNote = await noteService.pinNote(validate);

            if (pinNote.error) {
                console.log(pinNote.error)
                return res.status(400).send({
                    error: pinNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: pinNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    unPinNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const unPinNote = await noteService.unPinNote(validate);

            if (unPinNote.error) {
                return res.status(400).send({
                    error: unPinNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: unPinNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    archiveNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const archiveNote = await noteService.archiveNote(validate);

            if (archiveNote.error) {
                return res.status(400).send({
                    error: archiveNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: archiveNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    unArchiveNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const unArchiveNote = await noteService.unArchiveNote(validate);

            if (unArchiveNote.error) {
                return res.status(400).send({
                    error: unArchiveNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: unArchiveNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    trashNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const trashNote = await noteService.trashNote(validate);

            if (trashNote.error) {
                return res.status(400).send({
                    error: trashNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: trashNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    unTrashNote: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const unTrashNote = await noteService.unTrashNote(validate);

            if (unTrashNote.error) {
                return res.status(400).send({
                    error: unTrashNote.error

                })
            }
            else {
                return res.status(200).send({
                    response: unTrashNote.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getArchivedNotes: async (req, res) => {
        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getArchivedNotes = await noteService.getArchivedNotes(validate);

            if (getArchivedNotes.error) {
                return res.status(400).send({
                    error: getArchivedNotes.error

                })
            }
            else {
                return res.status(200).send({
                    response: getArchivedNotes.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getTrashedNotes: async (req, res) => {

        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getTrashedNotes = await noteService.getTrashedNotes(validate);

            if (getTrashedNotes.error) {
                return res.status(400).send({
                    error: getTrashedNotes.error

                })
            }
            else {
                return res.status(200).send({
                    response: getTrashedNotes.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getCollaboratedNotes: async (req, res) => {
        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getCollaboratedNotes = await noteService.getCollaboratedNotes(validate);

            if (getCollaboratedNotes.error) {
                return res.status(400).send({
                    error: getCollaboratedNotes.error

                })
            }
            else {
                return res.status(200).send({
                    response: getCollaboratedNotes.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getPinnedNotes: async (req, res) => {
        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getPinnedNotes = await noteService.getPinnedNotes(validate);

            if (getPinnedNotes.error) {
                return res.status(400).send({
                    error: getPinnedNotes.error

                })
            }
            else {
                return res.status(200).send({
                    response: getPinnedNotes.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    addReminder: async (req, res) => {
        try {
            const validate = await reminderSchema.validateAsync(req.body)
            console.log(validate);
            const addReminder = await noteService.addReminder(validate);

            if (addReminder.error) {
                return res.status(400).send({
                    error: addReminder.error

                })
            }
            else {
                return res.status(200).send({
                    response: addReminder.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    removeReminder: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const removeReminder = await noteService.removeReminder(validate);

            if (removeReminder.error) {
                return res.status(400).send({
                    error: removeReminder.error

                })
            }
            else {
                return res.status(200).send({
                    response: removeReminder.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getReminders: async (req, res) => {
        try {
            const validate = await getNotesByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getReminders = await noteService.getReminders(validate);

            if (getReminders.error) {
                return res.status(400).send({
                    error: getReminders.error

                })
            }
            else {
                return res.status(200).send({
                    response: getReminders.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    // createNoteVersion: async (req, res) => {
    //     try {
    //         const validate = await updateSchema.validateAsync(req.body)
    //         console.log(validate);
    //         const createNoteVersion = await noteService.createNoteVersion(validate);

    //         if (createNoteVersion.error) {
    //             return res.status(400).send({
    //                 error: createNoteVersion.error

    //             })
    //         }
    //         else {
    //             return res.status(200).send({
    //                 response: createNoteVersion.response
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.status(400).send({
    //             error: err,
    //         })
    //     }
    // },

    getNoteVersionHistory: async (req, res) => {
        try {
            const validate = await deleteNoteSchema.validateAsync({ noteId: req.params.noteId })  // used deleteNoteSchema for noteId
            console.log(validate);
            const getNoteVersionHistory = await noteService.getNoteVersionHistory(validate);

            if (getNoteVersionHistory.error) {
                console.log(getNoteVersionHistory.error)
                return res.status(400).send({
                    error: getNoteVersionHistory.error

                })
            }
            else {
                return res.status(200).send({
                    response: getNoteVersionHistory.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },
    getUpcomingReminders: async (req, res) => {
        try {
            // const validate = await getSchema.validateAsync({ userId: req.params.userId });
            const getUpcomingReminders = await noteService.getUpcomingReminders();
            if (getUpcomingReminders.error) {
                console.log(getUpcomingReminders.error)
                return res.status(400).send({
                    error: getUpcomingReminders.error

                })
            }
            else {
                return res.status(200).send({
                    response: getUpcomingReminders.response
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