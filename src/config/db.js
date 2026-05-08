const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my_admin_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('成功连接到 MongoDB 数据库.');
  } catch (err) {
    console.error('连接 MongoDB 数据库失败:', err.message);
    process.exit(1);
  }
};

// 执行连接
connectDB();

module.exports = mongoose.connection;
