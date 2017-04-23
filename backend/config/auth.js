/**
 * 配置Passport.js策略——用户名密码策略
 */
import passport from 'passport';
import { Strategy } from 'passport-local';

import UserOrm from '../services/orm/user';

export default function () {
  passport.use(new Strategy({
    usernameField: 'email'
  }, async function (email, password, done) {
    try {
      let user = await UserOrm.findOne(email);
      if (!user) {
        return done(null, false, '邮箱不正确');
      }
      if (UserOrm.hashPassword(password) != user.password) {
        return done(null, false, '密码不正确')
      }
      delete user.password;
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));


  /**
   * 将用户信息存储到会话里
   * 这里仅仅将id存入，确保session足够小
   */
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });
  /**
   * 当需要使用user对象时,使用上一步存储的id属性，从数据库读取用户信息
   */
  passport.deserializeUser(async function (id, done) {
    try {
      let user = await UserOrm.findOneById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}