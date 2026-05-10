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

let cachedConnection = null;

const connectDB = async () => {
  // 如果已经有活跃连接，直接返回
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 如果正在连接中，等待现有的连接过程
  if (cachedConnection) {
    return await cachedConnection;
  }

  try {
    console.log('正在尝试连接 MongoDB...');
    cachedConnection = mongoose.connect(MONGODB_URI, dbOptions);
    
    await cachedConnection;
    console.log(`✅ MongoDB 数据库连接成功`);
    return mongoose.connection;
  } catch (err) {
    cachedConnection = null;
    console.error('💥 MongoDB 连接失败:', err.message);
    throw err;
  }
};

// 预执行一次连接
connectDB();

module.exports = connectDB;

// 优雅关闭连接
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB 连接已通过应用关闭');
  process.exit(0);
});

module.exports = connectDB;
