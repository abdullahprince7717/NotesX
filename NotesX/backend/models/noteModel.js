
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
                    user_id: body.userId

                });
                await models.Note_Collaborator.create({
                    note_collaborator_id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                })
                return {
                    response: {
                        reponse: createNote,
                        message: 'Note and collaborator(current user) Added successfully'
                    },
                }
            }
            else {
                const createNote = await Notes.create({
                    _id: body.noteId,
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId
                });
                await NoteCollaborator.create({
                    _id: body.noteCollaboratorId,
                    user_id: body.userId,
                    note_id: body.noteId
                })
                return {
                    response: {
                        reponse: createNote,
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

                                : true),

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
                        }
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
                const updateNote = await models.Notes.update({
                    note_title: body.noteTitle,
                    note_description: body.noteDescription,
                    note_image: body.noteImage,
                    user_id: body.userId
                }, {
                    where: {
                        note_id: body.noteId
                    }
                });
                return {
                    response: {
                        response: updateNote,
                        message: updateNote != 0 ? "Note updated successfully" : "Note not found"
                    },
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

    getAllCollaborators: async (noteId) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Note_Collaborator.findAll({
                        where: {
                            note_id: noteId
                        }
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
                    }
                })
                return {
                    response: {
                        reponse: deleteNote,
                        message: 'Note deleted successfully'
                    },
                }
            }
            else {
                const deleteNote = await Notes.deleteOne({
                    _id: noteId,
                })
                return {
                    response: {
                        reponse: deleteNote,
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
    // searchNote: async (query) => {
    //     try {
    //         const searchNote = await models.Notes.findAll({
    //             where: {
    //                 ...(query ? {
    //                     [Op.or]: [
    //                         {
    //                             note_title: {
    //                                 [Op.iLike]: `%${query}%`
    //                             }
    //                         },
    //                         {
    //                             note_description: {
    //                                 [Op.iLike]: `%${query}%`
    //                             }
    //                         }
    //                     ]
    //                 } : true),
    //             }
    //         })
    //         return {
    //             response: searchNote
    //         }
    //     }
    //     catch (err) {
    //         return {
    //             error: err,
    //         }
    //     }
    // }


}