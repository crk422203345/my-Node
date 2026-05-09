const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET /messages - 获取最新留言
router.get('/', messageController.getMessages);

// POST /messages - 提交新留言
router.post('/', messageController.addMessage);

module.exports = router;
