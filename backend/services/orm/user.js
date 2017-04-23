import db from '../../lib/db';
import crypto from 'crypto';
import uuid from '../../../util/uuid';
export default class UserOrm {
  static async isUniqueEmail(email) {
    try {
      const userList = await db.query("SELECT email FROM user WHERE email = ?", [email]);
      if (userList.length == 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }
  static async findOne(email) {
    try {
      const userList = await db.query("SELECT * FROM user WHERE email = ?", [email]);
      if (userList.length == 0) {
        return null;
      } else {
        return userList[0];
      }
    } catch (e) {
      throw e;
    }
  }
  static async findOneById(id) {
    try {
      const userList = await db.query("SELECT id,nickname,email,logo,coding_bind FROM user WHERE id = ?", [id]);
      if (userList.length == 0) {
        return null;
      } else {
        return userList[0];
      }
    } catch (e) {
      throw e;
    }
  }
  static hashPassword(password) {
    const md5 = crypto.createHash('md5');
    md5.update(password);
    return md5.digest('hex');
  }
  static async addUser(nickname, email, password) {
    let _pwd = UserOrm.hashPassword(password);
    let id = uuid();
    try {
      let params = {
        id: id,
        email: email,
        nickname: nickname,
        password: _pwd,
        logo: 'xxx'
      }
      await db.query("INSERT INTO user SET ?", params);
    } catch (e) {
      throw e;
    }
  }
}

