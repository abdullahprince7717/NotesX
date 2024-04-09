var express = require('express');
var router = express.Router();
const noteController = require('../controllers/noteController');
const middleware = require('../middleware/auth');


// router.use(middleware.client);
router.get('/', noteController.getNotes);
router.get('/:userId', noteController.getNotesByUserId);
router.post('/', noteController.createNote);
router.put('/update', noteController.updateNote);
router.delete('/:noteId', noteController.deleteNote);
router.post('/addCollaborator', noteController.addCollaborator);
// router.post('/removeCollaborator', noteController.removeCollaborator);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         noteId:
 *           type: string
 *         noteTitle:
 *           type: string
 *         noteDescription:
 *           type: string
 *         noteImage:
 *           type: string
 *         userId:
 *          type: string
 *       required:
 *         - noteId
 *         - noteTitle
 *         - noteDescription
 *         - noteImage
 *         - userId
 *       example:
 *          noteId: 1234
 *          userId: 1234
 *          noteTitle: NEw note
 *          noteDescription: Desc of new note
 *          noteImage: stringimage url
 *
    */

/**
 * @swagger
 * paths:
 *   /note/:
 *     get:
 *       summary: Get all notes
 *       tags:
 *         - Notes
 *       responses:
 *         '200':
 *           description: Successfully retrieved notes
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /note/{userId}:
 *     get:
 *       summary: Get notes by user ID
 *       tags:
 *         - Notes
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved notes by user ID
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /note/:
 *     post:
 *       summary: Create a new note
 *       tags:
 *         - Notes
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - noteTitle
 *                 - noteDescription
 *                 - noteImage
 *               properties:
 *                 user_id:
 *                  type: string
 *                 note_title:
 *                   type: string
 *                 note_description:
 *                   type: string
 *                 note_image:
 *                  type: string
 *               example:
 *                 userId: 1234
 *                 noteTitle: New Note
 *                 noteDescription: This is a new note
 *                 noteImage: imageurladad
 *       responses:
 *         '201':
 *           description: Note created successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /note/update:
 *     put:
 *       summary: Update a note
 *       tags:
 *         - Notes
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - noteId
 *                 - noteTitle
 *                 - noteDescription
 *                 - noteImage
 *               properties:
 *                 note_id:
 *                  type: string
 *                 note_title:
 *                   type: string
 *                 note_description:
 *                   type: string
 *                 note_image:
 *                  type: string
 *               example:
 *                 noteId: 1234
 *                 noteTitle: New Note
 *                 noteDescription: This is a new note
 *                 noteImage: imageurladad
 *       responses:
 *         '200':
 *           description: Note updated successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /note/{noteId}:
 *     delete:
 *       summary: Delete a note by ID
 *       tags:
 *         - Notes
 *       parameters:
 *         - in: path
 *           name: noteId
 *           required: true
 *           description: ID of the note to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Note deleted successfully
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /note/addCollaborator:
 *     post:
 *       summary: Add collaborator to a note
 *       tags:
 *         - Notes
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 noteId:
 *                   type: string
 *                 userId:
 *                   type: string
 *             example:
 *              noteId: "1234"
 *              userId: "1234"
 *       responses:
 *         '200':
 *           description: Collaborator added successfully
 *         '400':
 *           description: Bad request
 */

