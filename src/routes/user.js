const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/info', UserController.getUserInfo);

module.exports = router;
