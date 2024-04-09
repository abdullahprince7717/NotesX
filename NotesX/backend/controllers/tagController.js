const tagService = require('../services/tagService');
const joi = require('joi');

const createSchema = joi.object().keys({
    tagName: joi.string().required().min(3),
    userId: joi.string().required(),
})

const updateSchema = joi.object().keys({
    tagId: joi.string().required(),
    tagName: joi.string().required().min(3),
    userId: joi.string().required(),
})

const getTagsByUserIdSchema = joi.object().keys({
    userId: joi.string().required(),
})

const deleteTagSchema = joi.object().keys({
    tagId: joi.string().required(),
})

const addTagToNoteSchema = joi.object().keys({
    noteId: joi.string().required(),
    tagId: joi.string().required(),
})

const removeTagFromNoteSchema = joi.object().keys({
    noteTagId: joi.string().required(),
})

module.exports = {
    createTag: async (req, res) => {
        try {
            const validate = await createSchema.validateAsync(req.body)
            console.log(validate);
            const createTag = await tagService.createTag(validate);

            if (createTag.error) {
                return res.status(400).send({
                    error: createTag.error

                })
            }
            else {
                return res.status(201).send({
                    response: createTag.response
                })
            }
        }
        catch (err) {
            return res.status(200).send({
                error: err,
            })
        }
    },
    getTags: async (req, res) => {
        try {

            const getTags = await tagService.getTags();

            if (getTags.error) {
                return res.status(400).send({
                    error: getTags.error

                })
            }
            else {
                return res.status(200).send({
                    response: getTags.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    getTagsByUserId: async (req, res) => {
        try {
            const validate = await getTagsByUserIdSchema.validateAsync({ userId: req.params.userId })
            console.log(validate);
            const getTagsByUserId = await tagService.getTagsByUserId(validate);

            if (getTagsByUserId.error) {
                return res.status(400).send({
                    error: getTagsByUserId.error

                })
            }
            else {
                return res.status(200).send({
                    response: getTagsByUserId.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    updateTag: async (req, res) => {
        try {
            const validate = await updateSchema.validateAsync(req.body)
            console.log(validate);
            const updateTag = await tagService.updateTag(validate);

            if (updateTag.error) {
                console.log(updateTag.error)
                return res.status(400).send({
                    error: updateTag.error

                })
            }
            else {
                return res.status(200).send({
                    response: updateTag.response
                })
            }
        }
        catch (err) {
            return res.status(400).send({
                error: err,
            })
        }
    },

    deleteTag: async (req, res) => {
        try {
            const validate = await deleteTagSchema.validateAsync({ tagId: req.params.tagId })
            console.log(validate);
            const deleteTag = await tagService.deleteTag(validate);

            if (deleteTag.error) {
                return res.status(400).send({
                    error: deleteTag.error

                })
            }
            else {
                return res.status(200).send({
                    response: deleteTag.response
                })
            }
        }
        catch (err) {
            return req.status(400).send({
                error: err,
            })
        }
    },
    addTagToNote: async (req, res) => {
        try {
            const validate = await addTagToNoteSchema.validateAsync(req.body);
            const addTagToNote = await tagService.addTagToNote(validate);
            if (addTagToNote.error) {
                return res.status(400).send({
                    error: addTagToNote.error
                })
            }
            else {
                return res.status(200).send({
                    response: addTagToNote.response
                })
            }
        } catch (error) {
            return res.status(400).send({
                error: error
            })
        }
    },
    removeTagFromNote: async (req, res) => {
        try {
            const validate = await removeTagFromNoteSchema.validateAsync({ noteTagId: req.params.noteTagId });
            const removeTagFromNote = await tagService.removeTagFromNote(validate);
            if (removeTagFromNote.error) {
                return res.status(400).send({
                    error: removeTagFromNote.error
                })
            }
            else {
                return res.status(200).send({
                    response: removeTagFromNote.response
                })
            }
        } catch (error) {
            return res.send({
                error: error
            })
        }
    }


}