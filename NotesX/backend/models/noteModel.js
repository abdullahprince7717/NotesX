
const { models } = require('../models/index');
const Notes = require('./mongoModels/notes')
const NoteCollaborator = require('./mongoModels/noteCollaborator')
const config = require('../config.json')
const { Op } = require('sequelize');

module.exports = {
    createNote: async (body) => {
        try {
            if (config.database == 'postgres') {
                const createNote = await models.Notes.create({
                    note_id: body.noteId,
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId,
                    is_pinned: body.isPinned,
                    is_archived: body.isArchived,
                    is_trashed: body.isTrashed,
                    reminder: body.reminder,
                    reminder_status: body.reminderStatus

                });
                await models.Note_Collaborator.create({
                    note_collaborator_id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                })

                await models.Note_Version_History.create({
                    note_version_id: body.noteVersionId,
                    note_id: body.noteId,
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    is_pinned: body.isPinned,
                    is_archived: body.isArchived,
                    is_trashed: body.isTrashed,
                    reminder: body.reminder,
                    reminder_status: body.reminderStatus
                });


                return createNote;
            }
            else {
                const createNote = await Notes.create({
                    _id: body.noteId,
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId,
                    is_pinned: body.isPinned,
                    is_archived: body.isArchived,
                    is_trashed: body.isTrashed,
                    reminder: body.reminder,
                    reminder_status: body.reminderStatus
                });
                await NoteCollaborator.create({
                    _id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                })
                return {
                    response: {
                        response: createNote,
                        message: 'Note and collaborator(current user) Added successfully'
                    },
                }
            }

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getNotes: async (offset, query) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Notes.findAll({
                        where: {
                            ...(query.searchQuery ?
                                {
                                    [Op.or]: [
                                        {
                                            note_title: {
                                                [Op.iLike]: `%${query.searchQuery}%`
                                            }
                                        },
                                        {
                                            note_description: {
                                                [Op.iLike]: `%${query.searchQuery}%`
                                            }
                                        }
                                    ]
                                }

                                : true)
                        },
                        offset: offset ? offset : 0,
                        limit: query.limit,
                        order: (query.sortValue && query.sortOrder) ? [
                            [query.sortValue, query.sortOrder]
                        ] : []
                    })
                }
            }
            else {
                return {
                    response: await Notes.find()
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getNotesByUserId: async ({ userId }) => {
        try {
            if (config.database == 'postgres') {

                return {
                    response: await models.Notes.findAll({
                        where: {
                            user_id: userId,
                        },
                        include: [{
                            model: models.Users,
                            attributes: ['first_name', 'last_name', 'email']
                        },
                        {
                            model: models.Note_Collaborator,
                            attributes: ['user_id', 'note_id'],
                            include: [{
                                model: models.Users,
                                attributes: ['first_name', 'last_name', 'email']
                            }]
                        },
                        {
                            model: models.Note_Version_History,
                        },
                        {
                            model: models.Note_Tag,
                            attributes: ['tag_id', 'note_id'],
                            include: [{
                                model: models.Tags,
                                attributes: ['tag_name']
                            }]
                        }
                        ]


                    })
                }
            }
            else {
                return {
                    response: await Notes.find({
                        user_id: userId,
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

    updateNote: async (body) => {
        try {
            if (config.database == 'postgres') {

                const updatedNote = await models.Notes.update({
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId,
                    is_pinned: body.isPinned,
                    is_archived: body.isArchived,
                    is_trashed: body.isTrashed,
                    reminder: body.reminder,
                    reminder_status: body.reminderStatus
                }, {
                    where: {
                        note_id: body.noteId
                    },
                    include: [
                        {
                            model: models.Note_Tag,
                            attributes: ['tag_id', 'note_id'],
                            include: [{
                                model: models.Tags,
                                attributes: ['tag_name']
                            }]
                        }
                    ],
                    returning: true,
                    plain: true
                });

                await models.Note_Version_History.create({
                    note_version_id: body.noteVersionId,
                    note_id: body.noteId,
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    is_pinned: body.isPinned,
                    is_archived: body.isArchived,
                    is_trashed: body.isTrashed,
                    reminder: body.reminder,
                    reminder_status: body.reminderStatus
                });

                const Note_Collaborators = await models.Note_Collaborator.findAll({
                    where: {
                        note_id: body.noteId
                    },
                    attributes: ['user_id', 'note_id'],
                    include: [{
                        model: models.Users,
                        attributes: ['first_name', 'last_name', 'email']
                    }]

                })

                const Note_Tags = await models.Note_Tag.findAll({
                    where: {
                        note_id: body.noteId
                    },
                    attributes: ['tag_id', 'note_id'],
                    include: [{
                        model: models.Tags,
                        attributes: ['tag_name']
                    }]
                })

                const updateNote = {
                    ...updatedNote[1].dataValues,
                    Note_Tags: Note_Tags,
                    Note_Collaborators: Note_Collaborators
                };

                return {
                    response: { updateNote },
                };
            }
            else {
                const updateNote = await Notes.findOneAndUpdate({
                    _id: body.noteId
                }, {
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId
                }, {
                    returnOriginal: false
                });
                return {
                    response: {
                        response: updateNote,
                        message: updateNote != 0 ? "Note updated successfully" : "Note not found"
                    },
                };
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },

    addCollaborator: async (body) => {
        try {
            if (config.database == 'postgres') {
                const addCollaborator = await models.Note_Collaborator.create({
                    note_collaborator_id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                });
                return {
                    response: {
                        response: addCollaborator,
                        message: "Collaborator added successfully"
                    },
                };
            }
            else {
                const addCollaborator = await NoteCollaborator.create({
                    _id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                });
                return {
                    response: {
                        response: addCollaborator,
                        message: "Collaborator added successfully"
                    },
                };
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },

    removeCollaborator: async (body) => {
        try {
            if (config.database == 'postgres') {
                const removeCollaborator = await models.Note_Collaborator.destroy({
                    where: {
                        note_id: body.noteId,
                        user_id: body.userId
                    }
                });
                return {
                    response: {
                        response: removeCollaborator,
                        message: removeCollaborator != 0 ? "Collaborator removed successfully" : "Collaborator not found"
                    },
                };
            }
            else {
                const removeCollaborator = await NoteCollaborator.deleteOne({
                    note_id: body.noteId,
                    user_id: body.userId
                });
                return {
                    response: {
                        response: removeCollaborator,
                        message: removeCollaborator != 0 ? "Collaborator removed successfully" : "Collaborator not found"
                    },
                };
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },
    getAllCollaborators: async (noteId) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Note_Collaborator.findAll({
                        where: {
                            note_id: noteId
                        },
                        attributes: ['user_id', 'note_id'],
                        include: [{
                            model: models.Users,
                            attributes: ['first_name', 'last_name', 'email']
                        },
                        {
                            model: models.Notes,
                            attributes: ['note_title', 'note_description', 'note_image']
                        }]


                    })

                }
            }
            else {
                return {
                    response: await NoteCollaborator.find()
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    verifyCollaborator: async ({ noteId, userId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Note_Collaborator.findOne({
                        where: {
                            note_id: noteId,
                            user_id: userId
                        }
                    })
                }
            }
            else {
                return {
                    response: await NoteCollaborator.findOne({
                        note_id: noteId,
                        user_id: collaboratorId
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

    deleteNote: async ({ noteId }) => {
        try {
            if (config.database == 'postgres') {
                const deleteNote = await models.Notes.destroy({
                    where: {
                        note_id: noteId,
                    },
                    returning: true,
                    plain: true
                })
                const noteCollaborators = await models.Note_Collaborator.findAll({
                    where: {
                        note_id: noteId
                    },
                    attributes: ['user_id', 'note_id'],
                    include: [{
                        model: models.Users,
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: models.Notes,
                        attributes: ['note_title', 'note_description', 'note_image']
                    }]

                })
                return { deleteNote, noteCollaborators, noteId }

            }
            else {
                const deleteNote = await Notes.deleteOne({
                    _id: noteId,
                })
                return {
                    response: {
                        response: deleteNote,
                        message: 'Note deleted successfully'
                    },
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    verifyOwner: async ({ noteId, ownerId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Notes.findOne({
                        where: {
                            note_id: noteId,
                            user_id: ownerId
                        }
                    })
                }
            }
            else {
                return {
                    response: await Notes.findOne({
                        _id: noteId,
                        user_id: userId
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
    getNoteById: async ({ noteId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Notes.findOne({
                        where: {
                            note_id: noteId
                        }
                    })
                }
            }
            else {
                return {
                    response: await Notes.findOne({
                        _id: noteId
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

    getCollaboratedNotes: async ({ userId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Note_Collaborator.findAll({
                        where: {
                            user_id: userId
                        },
                        attributes: ['note_id'],
                        include: [{
                            model: models.Notes,
                            attributes: ['note_title', 'note_description', 'note_image']
                        }]
                    })
                }
            }
            else {
                return {
                    response: await NoteCollaborator.find({
                        user_id: userId
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

    pinNote: async ({ noteId }) => {
        try {
            const pinNote = await models.Notes.update({
                is_pinned: true
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return pinNote
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unPinNote: async ({ noteId }) => {
        try {
            const unPinNote = await models.Notes.update({
                is_pinned: false
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return unPinNote
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    archiveNote: async ({ noteId }) => {
        try {
            const archiveNote = await models.Notes.update({
                is_archived: true
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return archiveNote

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unArchiveNote: async ({ noteId }) => {
        try {

            const unArchiveNote = await models.Notes.update({
                is_archived: false
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return unArchiveNote

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    trashNote: async ({ noteId }) => {
        try {
            const trashNote = await models.Notes.update({
                is_trashed: true
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return trashNote

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    unTrashNote: async ({ noteId }) => {
        try {
            const unTrashNote = await models.Notes.update({
                is_trashed: false
            }, {
                where: {
                    note_id: noteId
                },
                returning: true,
                plain: true
            })
            return unTrashNote

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getArchivedNotes: async ({ userId }) => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        user_id: userId,
                        is_archived: true
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

    getTrashedNotes: async ({ userId }) => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        user_id: userId,
                        is_trashed: true
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

    getPinnedNotes: async ({ userId }) => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        user_id: userId,
                        is_pinned: true
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

    addReminder: async ({ noteId, reminder }) => {
        try {
            const addReminder = await models.Notes.update({
                reminder: reminder,
                reminder_status: true
            }, {
                where: {
                    note_id: noteId
                }
            })
            return {
                response: {
                    response: addReminder,
                    message: addReminder != 0 ? "Reminder added successfully" : "Note not found"
                },
            }

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    removeReminder: async ({ noteId }) => {
        try {
            const removeReminder = await models.Notes.update({
                reminder: null,
                reminder_status: false
            }, {
                where: {
                    note_id: noteId
                }
            })
            return {
                response: {
                    response: removeReminder,
                    message: removeReminder != 0 ? "Reminder removed successfully" : "Note not found"
                },
            }

        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getReminders: async ({ userId }) => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        user_id: userId,
                        reminder_status: true
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

    // createNoteVersion: async (body) => {
    //     try {
    //         const createNoteVersion = await models.Note_Version_History.create({
    //             note_version_id: body.noteVersionId,
    //             note_id: body.noteId,
    //             note_title: body.noteTitle,
    //             note_description: body.noteDescription,
    //             note_image: body.noteImage,
    //             user_id: body.userId
    //         });
    //         return {
    //             response: {
    //                 response: createNoteVersion,
    //                 message: 'Note version created successfully'
    //             },
    //         }


    //     }
    //     catch (err) {
    //         return {
    //             error: err,
    //         }
    //     }
    // },

    getNoteVersionHistory: async ({ noteId }) => {
        try {
            return {
                response: await models.Note_Version_History.findAll({
                    where: {
                        note_id: noteId
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
    getUpcomingReminders: async () => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        reminder_status: true,
                        reminder: {
                            [Op.gt]: new Date()
                        }
                    }
                })
            }
        } catch (error) {
            return {
                error: error,
            }
        }

    },

    getUpcomingRemindersByUserId: async ({ userId }) => {
        try {
            return {
                response: await models.Notes.findAll({
                    where: {
                        user_id: userId,
                        reminder_status: true,
                        reminder: {
                            [Op.gt]: new Date()
                        }
                    }
                })
            }
        } catch (error) {
            return {
                error: error,
            }
        }

    }
}