// For Admin User, Admin will be able to see all the users in the system and perform CRUD operations on the users.var express = require('express');
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middleware/auth');


router.put('/update', userController.updateUser);

router.use(middleware.admin);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * paths:
 *   /user/:
 *     get:
 *       summary: Get all users
 *       tags:
 *         - Users
 *       responses:
 *         '200':
 *           description: Successfully retrieved users
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /user/{userId}:
 *     get:
 *       summary: Get user by ID
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved user by ID
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /user/:
 *     post:
 *       summary: Create a new user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: User created successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /user/update:
 *     put:
 *       summary: Update a user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - firstName
 *                 - lastName
 *                 - password
 *               properties:
 *                 userId:
 *                  type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *               example:
 *                 userId: 1234ac
 *                 firstName: John
 *                 lastName: Doe
 *       responses:
 *         '200':
 *           description: User updated successfully
 *         '400':
 *           description: Bad request
 */

/**
 * @swagger
 * paths:
 *   /user/{userId}:
 *     delete:
 *       summary: Delete a user by ID
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: User deleted successfully
 *         '401':
 *           description: Unauthorized
 */
