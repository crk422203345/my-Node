const Route = require('./Route');

class RouteModel {
  static async getRoutesByRole(role) {
    try {
      // 使用 Mongoose 查询
      const routes = await Route.find({ role: role });
      return routes;
    } catch (error) {
      console.error('查询数据库错误 [RouteModel]:', error);
      throw error;
    }
  }
}

module.exports = RouteModel;
