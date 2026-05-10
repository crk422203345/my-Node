const apiRoute = require('./api');
const messagesRoute = require('./messages');
const userRoute = require('./user');

/**
 * 注册路由
 * @param {import('express').Express} app - Express 实例
 */
module.exports = function setupRoutes(app) {
  app.use('/api/api', apiRoute);
  app.use('/api/messages', messagesRoute);
  app.use('/api/user', userRoute);

  console.log('[Router] 路由挂载完成: /api/api, /api/messages, /api/user');
};
