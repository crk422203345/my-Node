const Message = require('../models/Message');

/**
 * 获取最新留言列表
 */
exports.getMessages = async (req, res) => {
  try {
    // 检查数据库连接状态
    if (mongoose.connection.readyState !== 1) {
      throw new Error('数据库未连接，请检查 MongoDB Atlas 白名单 (0.0.0.0/0) 或环境变量');
    }

    const messages = await Message.find()
      .sort({ createdAt: -1 }) // 按时间倒序
      .limit(50); // 限制返回数量

    res.json({
      code: 200,
      data: messages,
      total: messages.length
    });
  } catch (err) {
    console.error('获取留言失败:', err);
    res.status(500).json({ 
      code: 500, 
      message: '获取留言失败',
      error: err.message // 将具体错误信息传给前端，方便排查
    });
  }
};

/**
 * 添加新留言
 */
exports.addMessage = async (req, res) => {
  try {
    const { nickname, content } = req.body;

    if (!nickname || !content) {
      return res.status(400).json({ code: 400, message: '昵称和内容不能为空' });
    }

    // 检查数据库连接状态
    if (mongoose.connection.readyState !== 1) {
      throw new Error('数据库未连接，请检查 MongoDB Atlas 白名单 (0.0.0.0/0) 或环境变量');
    }

    const newMessage = new Message({
      nickname,
      content
    });

    await newMessage.save();

    res.status(201).json({
      code: 201,
      message: '留言成功',
      data: newMessage
    });
  } catch (err) {
    console.error('存储留言失败:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ code: 400, message: err.message });
    }
    res.status(500).json({ 
      code: 500, 
      message: '存储留言失败',
      error: err.message 
    });
  }
};
