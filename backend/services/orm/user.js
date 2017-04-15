import db from '../../lib/db';

export default class UserOrm {
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
}

