const noteService = require('../services/noteService');
const joi = require('joi');
const mailer = require('./mailer');
const initSocket = require('../bin/socketManager');

const { io } = initSocket();
const createSchema = joi.object().keys({
    noteTitle: joi.string().required().min(3),
    noteDescription: joi.string().required(),
    noteImage: joi.string(),
    userId: joi.string().required(),
})

const updateSchema = joi.object().keys({
    noteId: joi.string().required(),
    noteTitle: joi.string().required().min(3),
    noteDescription: joi.string().required(),
    noteImage: joi.string(),
    userId: joi.string().required(),
})

const getNotesByUserIdSchema = joi.object().keys({
    userId: joi.string().required(),
})

const deleteNoteSchema = joi.object().keys({
    noteId: joi.string().required(),
})
const addCollaboratorSchema = joi.object().keys({
    ownerId: joi.string().required(),
    userId: joi.string().required(),
    noteId: joi.string().required(),
})

const paginationSchema = joi.object().keys({
    pageNo: joi.number().positive().greater(0).required(),
    limit: joi.number().valid(),
    sortValue: joi.string().valid('note_title', 'createdAt', "updatedAt"), // enum value 
    sortOrder: joi.string().valid('ASC', 'DESC'),
    searchQuery: joi.string(),
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
                return res.status(201).send({
                    response: createNote.response
                })
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
            const userId = addCollaborator.response.response.dataValues.user_id;
            console.log("userId", userId);
            if (addCollaborator.error) {
                return res.status(400).send({
                    error: addCollaborator.error

                })
            }
            else {
                await mailer.customEmail(userId, 'Collaborator Added', 'You have been added as a collaborator to a note');
                io.emit('add', "Collaborator Added Notification");
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

    getAllCollaborators: async (req, res) => {
        try {
            const { noteId } = req.query;
            const getAllCollaborators = await noteService.getAllCollaborators(noteId);
            if (getAllCollaborators.error) {
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
    // searchNote: async (req, res) => {
    //     try {
    //         const { query } = req.query;
    //         const searchNote = await noteService.searchNote(query);
    //         if (searchNote.error) {
    //             console.log(searchNote.error);
    //             return res.send({
    //                 error: searchNote.error

    //             })
    //         }
    //         else {
    //             return res.send({
    //                 response: searchNote.response
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.send({
    //             error: err,
    //         })
    //     }
    // }
}