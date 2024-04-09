const noteModel = require('../models/noteModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createNote: async (body) => {
        try {
            const noteId = uuidv4();
            const noteCollaboratorId = uuidv4();
            const createNote = await noteModel.createNote({ ...body, noteId, noteCollaboratorId });
            if (createNote.error) {
                return {
                    error: createNote.error
                }
            }
            else {
                return {
                    response: createNote.response
                }
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
            const offset = (query.pageNo - 1) * query.limit;
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
            const updateNote = await noteModel.updateNote(body);
            if (updateNote.error) {
                return {
                    error: updateNote.error
                }
            }
            else {
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
            const verifyOwner = await noteModel.verifyOwner(body);
            const verifyCollaborator = await noteModel.verifyCollaborator(body);
            if (verifyOwner.error) {
                return {
                    error: "Only the owner of the note can add collaborators."
                }
            }
            else if (body.userId == body.ownerId) {
                return {
                    error: "You cannot add yourself as Collaborator."
                }
            }
            // else if (verifyCollaborator && body.userId == verifyCollaborator?.response?.dataValues?.user_id) {
            //     return {
            //         error: "User is already a collaborator."
            //     }
            // }
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
    getAllCollaborators: async (noteId) => {
        try {
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
            if (deleteNote.error) {
                return {
                    error: deleteNote.error
                }
            }
            else {
                return {
                    response: deleteNote.response
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
    //         const searchNote = await noteModel.searchNote(query);
    //         if (searchNote.error) {
    //             return {
    //                 error: searchNote.error
    //             }
    //         }
    //         else {
    //             return {
    //                 response: searchNote.response
    //             }
    //         }
    //     }
    //     catch (err) {
    //         return {
    //             error: err,
    //         }
    //     }
    // }
}