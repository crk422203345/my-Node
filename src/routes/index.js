const fs = require('fs');
const path = require('path');

/**
 * 动态读取并注册路由
 * @param {import('express').Express} app - Express 实例
 */
module.exports = function setupRoutes(app) {
  const routesPath = __dirname;

  fs.readdirSync(routesPath).forEach((file) => {
    // 排除当前文件 (index.js)
    if (file === 'index.js') return;

    if (file.endsWith('.js')) {
      const routePrefix = `/api/${file.replace('.js', '')}`;
      const routeModule = require(path.join(routesPath, file));

      app.use(routePrefix, routeModule);
      console.log(`[Router] 成功挂载路由: ${routePrefix}`);
    }
  });
};
