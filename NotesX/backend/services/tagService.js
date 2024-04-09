
const tagModel = require('../models/tagModel')
const { v4: uuidv4 } = require('uuid');

module.exports = {

    createTag: async (body) => {
        try {
            const tagId = uuidv4();
            const createTag = await tagModel.createTag({ ...body, tagId });
            if (createTag.error) {
                return {
                    error: createTag.error
                }
            }
            else {
                return {
                    response: createTag.response
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
            const getTags = await tagModel.getTags();
            if (getTags.error) {
                return {
                    error: getTags.error
                }
            }
            else {
                return {
                    response: getTags.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    getTagsByUserId: async (userId) => {
        try {
            const getTagsByUserId = await tagModel.getTagsByUserId(userId);
            if (getTagsByUserId.error) {
                return {
                    error: getTagsByUserId.error
                }
            }
            else {
                return {
                    response: getTagsByUserId.response
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
            const updateTag = await tagModel.updateTag(body);
            if (updateTag.error) {
                return {
                    error: updateTag.error
                }
            }
            else {
                return {
                    response: updateTag.response
                }
            }
        }
        catch (err) {
            return {
                error: err,
            }
        }
    },

    deleteTag: async (tagId) => {
        try {
            const deleteTag = await tagModel.deleteTag(tagId);
            if (deleteTag.error) {
                return {
                    error: deleteTag.error
                }
            }
            else {
                return {
                    response: deleteTag.response
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
            const noteTagId = uuidv4();
            const addTagToNote = await tagModel.addTagToNote({ ...body, noteTagId });
            return {
                response: addTagToNote

            }
        } catch (error) {
            return {
                error: error
            }
        }
    },
    removeTagFromNote: async (noteTagId) => {
        try {
            const removeTagFromNote = await tagModel.removeTagFromNote(noteTagId);
            return {
                response: removeTagFromNote

            }
        } catch (error) {
            return {
                error: error
            }
        }
    }
}