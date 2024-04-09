
const { models } = require('../models/index');
const Tags = require('./mongoModels/tags')
const NoteTag = require('./mongoModels/noteTags')
const config = require('../config.json')
module.exports = {

    createTag: async (body) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Tags.create({
                        tag_id: body.tagId,
                        tag_name: body.tagName,
                        user_id: body.userId
                    }),
                }
            }
            else {
                return {
                    response: await Tags.create({
                        _id: body.tagId,
                        tag_name: body.tagName,
                        user_id: body.userId
                    }),
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },
    getTags: async () => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Tags.findAll()
                }
            }
            else {
                return {
                    response: await Tags.find()
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getTagsByUserId: async ({ userId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Tags.findAll({
                        where: {
                            user_id: userId,
                        }
                    })
                }
            }
            else {
                return {
                    response: await Tags.find({
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

    updateTag: async (body) => {
        try {
            console.log("body", body)
            if (config.database == 'postgres') {
                return {
                    response: await models.Tags.update({
                        tag_name: body.tagName,
                    }, {
                        where: {
                            tag_id: body.tagId
                        }
                    }),
                }
            }
            else {
                return {
                    response: await Tags.findOneAndUpdate({
                        _id: body.tagId
                    }, {
                        tag_name: body.tagName,
                    }, {
                        returnOriginal: false
                    }
                    ),
                }
            }
        }
        catch (error) {
            return {
                error: error
            };
        }
    },

    deleteTag: async ({ tagId }) => {
        try {
            if (config.database == 'postgres') {
                return {
                    response: await models.Tags.destroy({
                        where: {
                            tag_id: tagId,
                        }
                    }),
                }
            }
            else {
                return {
                    response: await Tags.deleteOne({
                        _id: tagId,
                    }),
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    addTagToNote: async (body) => {
        try {
            if (config.database == 'postgres') {
                const addTagToNote = await models.Note_Tag.create({
                    note_tag_id: body.noteTagId,
                    note_id: body.noteId,
                    tag_id: body.tagId
                })
                return {
                    response: {
                        response: addTagToNote,
                        message: "Tag added to note successfully"
                    }
                }
            }
            else {
                const addTagToNote = await NoteTag.create({
                    _id: body.noteTagId,
                    note_id: body.noteId,
                    tag_id: body.tagId
                })
                return {
                    response: {
                        response: addTagToNote,
                        message: "Tag added to note successfully"
                    }
                }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    removeTagFromNote: async ({ noteTagId }) => {
        try {
            if (config.database == 'postgres') {
                const removeTagFromNote = await models.Note_Tag.destroy({
                    where: {
                        note_tag_id: noteTagId, // note_id and tag_id
                    }
                })
                return {
                    response: {
                        response: removeTagFromNote,
                        message: 'Tag removed from note successfully'
                    }
                }
            }
            else {
                const removeTagFromNote = await NoteTag.deleteOne({
                    _id: noteTagId,
                })
                return {
                    response: {
                        response: removeTagFromNote,
                        message: 'Tag removed from note successfully'
                    }
                }
            }
        } catch (err) {
            return {
                error: err,
            }
        }
    }
}