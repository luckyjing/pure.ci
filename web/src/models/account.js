/**
 * Created by sujingxin on 2016/12/22.
 * 创建Mongoose AccountSchema模式,定义User模型,供其他部件使用
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import crypto from 'crypto';
var AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    validate: [function (password) {
      return password && password.length >= 6;
    }, '密码至少为6位']
  },
  name: {
    type: String
  },
  salt: {
    type: String
  },
  email: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
// 类方法,去查找文档
AccountSchema.statics.findOneByEmail = function (email, callback) {
  this.findOne({email: email}, callback);
};
AccountSchema.statics.findUniqueUsername = function (username, callback) {
  var _this = this;
  _this.findOne({
    username: username
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(true);
      } else {
        return callback(false);
      }
    } else {
      callback(null);
    }
  })
};
// 密码验证策略
AccountSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};
// 密码加密策略
AccountSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
//在存储用户密码之前,需要对密码进行加盐和哈希操作
AccountSchema.pre('save', function (next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});
// 一般输出的时候是res.json(user),为了让在转换前执行,就得调用下面这句话
AccountSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('Account', AccountSchema);
