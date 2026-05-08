const RouteModel = require('../models/routeModel');

class RouteController {
  static async getDynamicRoutes(req, res) {
    const role = req.query.role || 'user'; 
    
    try {
      const routes = await RouteModel.getRoutesByRole(role);
      
      if (routes && routes.length > 0) {
        res.json({
          code: 200,
          message: '获取路由成功',
          data: routes
        });
      } else {
        res.status(403).json({
          code: 403,
          message: '无权限获取该角色的路由或角色不存在',
          data: []
        });
      }
    } catch (error) {
      console.error('获取动态路由失败 [RouteController]:', error);
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }
}

module.exports = RouteController;
