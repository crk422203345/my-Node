const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my_admin_db';

/**
 * 数据库连接配置选项
 * 针对线上云数据库进行优化
 */
const dbOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000, // 5s 连不上立刻报错
  socketTimeoutMS: 45000,
  family: 4,
  bufferCommands: false, // 禁止在未连接时缓冲命令
  autoIndex: true
};

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connection.on('connected', () => {
      const host = mongoose.connection.host;
      console.log(`✅ MongoDB 数据库连接成功 | 目标主机: ${host}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB 数据库错误:', err.message);
    });

    await mongoose.connect(MONGODB_URI, dbOptions);
  } catch (err) {
    console.error('💥 MongoDB 初始连接失败:', err.message);
    // 在 Serverless 环境中移除 process.exit，防止函数硬崩溃
  }
};

// 优雅关闭连接
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB 连接已通过应用关闭');
  process.exit(0);
});

// 执行连接
connectDB();

module.exports = mongoose.connection;
