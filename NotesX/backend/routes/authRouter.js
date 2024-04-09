var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const mailer = require('../controllers/mailer');


router.post('/verifyOtp', authController.verifyOtp);
router.post('/login', authController.logIn);
router.post('/signup', authController.signUp);
router.post('/logout', authController.logOut);
router.post('/verifyEmail', authController.generateOtp, mailer.verifyEmail);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *      type: object
 *      required:
 *        - userId
 *        - email
 *        - password
 *        - firstName
 *        - lastName
 *      properties:
 *          userId:
 *              type: string
 *              description: The auto-generated id of the user
 *          firstName:
 *              type: string  
 *          lastName:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *      example:
 *          firstName: John
 *          lastName: Doe
 *          email: abc123@gmail.com
 *          password: abc123456
 * 
 */

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: Log in user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 email: dev.abdullahali@gmail.com
 *                 password: 12345678
 *       responses:
 *         '200':
 *           description: Successful login
 *         '401':
 *           description: Unauthorized
 */

/**
 * @swagger
 * paths:
 *   /auth/signup:
 *     post:
 *       summary: Sign up user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: User signed up successfully
 *         '400':
 *           description: Bad request
 */

