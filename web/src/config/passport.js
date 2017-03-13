'use strict';
/**
 * 配置验证策略
 */
import mongoose from 'mongoose';

export default (passport)=> {
  const AccountModel = mongoose.model('Account');
  /**
   * 当用户身份验证完成后,会将id属性存到会话中
   */
  passport.serializeUser(function (user, done) {
    console.log('执行了');
    done(null, user.id)
  });
  /**
   * 当需要使用user对象时,使用上一步存储的id属性，从数据库读取用户信息(传入-param是为了防止读取)
   */
  passport.deserializeUser(function (id, done) {
    AccountModel.findOne({
      _id: id
    }, '-password', (err, user)=> {
      done(err, user)
    })
  });
  /**
   * 这里进行用户验证
   */
  var LocalStrategy = require('passport-local').Strategy;
  // 在这里默认从Body中获取username和passowrd字段
  passport.use(new LocalStrategy(function (username, password, done) {
    AccountModel.findOne({
      username
    }, (err, user)=> {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }
      // 认证成功后将会把user传递给下一个执行对象
      return done(null, user);
    })
  }));
}