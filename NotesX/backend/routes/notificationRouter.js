var express = require('express');
var router = express.Router();
const notificationController = require('../controllers/notificationController');


router.get('/:userId', notificationController.getNotifications);
router.post('/create', notificationController.createNotification);
router.delete('/:notificationId', notificationController.deleteNotification);
router.patch('/:notificationId', notificationController.markAsRead);

module.exports = router;