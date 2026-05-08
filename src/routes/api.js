const express = require('express');
const router = express.Router();
const RouteController = require('../controllers/routeController');

// 获取动态路由的接口
router.get('/dynamic-routes', RouteController.getDynamicRoutes);

module.exports = router;
