var express = require('express');
var router = express.Router();
const tagController = require('../controllers/tagController');
const middleware = require('../middleware/auth');

// router.use(middleware.client);
router.get('/', tagController.getTags);
router.get('/:userId', tagController.getTagsByUserId);
router.post('/', tagController.createTag);
router.put('/update', tagController.updateTag);
router.delete('/:tagId', tagController.deleteTag);
router.post('/addTagToNote', tagController.addTagToNote);
router.delete('/delete/:noteTagId', tagController.removeTagFromNote);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         tagId:
 *           type: string
 *         tag_name:
 *           type: string
 *         userId:
 *          type: string
 *       required:
 *         - userId
 *         - tagId
 *         - tagName
 *       example:
 *         userId: "1234"
 *         tagId: "1234"
 *         tagName: "Important"
 */

/**
 * @swagger
 * paths:
 *   /tag/:
 *     get:
 *       summary: Get all tags
 *       tags:
 *         - Tags
 *       responses:
 *         '200':
 *           description: Successfully retrieved tags
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /tag/{userId}:
 *     get:
 *       summary: Get tags by user ID
 *       tags:
 *         - Tags
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved tags by user ID
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /tag/:
 *     post:
 *       summary: Create a new tag
 *       tags:
 *         - Tags
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - tagName
 *               properties:
 *                 userId:
 *                  type: string
 *                 tagName:
 *                   type: string
 *             example:
 *              userId: "1234"
 *              tagName: "Important"
 *       responses:
 *         '201':
 *           description: Tag created successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /tag/update:
 *     put:
 *       summary: Update a tag
 *       tags:
 *         - Tags
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       responses:
 *         '200':
 *           description: Tag updated successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /tag/{tagId}:
 *     delete:
 *       summary: Delete a tag by ID
 *       tags:
 *         - Tags
 *       parameters:
 *         - in: path
 *           name: tagId
 *           required: true
 *           description: ID of the tag to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Tag deleted successfully
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /tag/addTagToNote:
 *     post:
 *       summary: Add tag to a note
 *       tags:
 *         - Tags
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 note_id:
 *                   type: string
 *                 tag_id:
 *                   type: string
 *               example:
 *                 note_id: "1234"
 *                 tag_id: "5678"
 *       responses:
 *         '200':
 *           description: Tag added to note successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /tag/delete/{noteTagId}:
 *     delete:
 *       summary: Remove tag from note by ID
 *       tags:
 *         - Tags
 *       parameters:
 *         - in: path
 *           name: noteTagId
 *           required: true
 *           description: ID of the note-tag relationship to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Tag removed from note successfully
 *         '401':
 *           description: Unauthorized
 */


