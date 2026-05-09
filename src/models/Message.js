const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, '昵称不能为空'],
    trim: true,
    maxlength: [20, '昵称最多 20 个字符']
  },
  content: {
    type: String,
    required: [true, '内容不能为空'],
    trim: true,
    maxlength: [100, '内容最多 100 个字符']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 添加索引以优化按时间倒序查询的性能
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
