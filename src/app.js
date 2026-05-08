const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routes');
require('./config/db'); // 初始化数据库连接
require('dotenv').config();

const app = express();

// 跨域配置 (CORS)
const corsOptions = {
  origin: '*', // 生产环境中建议写具体的前端域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 根路由 - 欢迎页面，避免首页 404
app.get('/', (req, res) => {
  res.json({
    code: 200,
    message: 'Welcome to Node.js API Server',
    status: 'Running',
    version: '1.0.0'
  });
});

// 动态挂载其他路由 (/api, /user 等)
setupRoutes(app);

// 404 处理
app.use((req, res, next) => {
  res.status(404).json({ code: 404, message: 'Not Found' });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('全局错误拦截:', err);
  res.status(500).json({ code: 500, message: 'Server Error' });
});

module.exports = app;
