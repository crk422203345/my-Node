const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my_admin_db';

/**
 * 数据库连接配置选项
 * 针对线上云数据库进行优化
 */
const dbOptions = {
  maxPoolSize: 10, // 连接池大小，根据并发量调整
  serverSelectionTimeoutMS: 5000, // 超时时间 5s
  socketTimeoutMS: 45000, // 保持活跃，防止云数据库断开空闲连接
  family: 4 // 使用 IPv4
};

const connectDB = async () => {
  try {
    // 监听连接事件
    mongoose.connection.on('connected', () => {
      const host = mongoose.connection.host;
      console.log(`✅ MongoDB 数据库连接成功 | 目标主机: ${host}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB 数据库错误:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB 数据库连接已断开，正在尝试重连...');
    });

    await mongoose.connect(MONGODB_URI, dbOptions);
  } catch (err) {
    console.error('💥 MongoDB 初始连接失败:', err.message);
    // 在生产环境中可能不希望进程直接退出，但如果是核心数据库，通常选择退出以便重启
    process.exit(1);
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
