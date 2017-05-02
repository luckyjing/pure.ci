/**
 * 本模块封装了对coding平台的openAPI处理
 */
import request from 'request-promise'
import Response from '../response'
import uuid from '../../../util/uuid';
import db from '../../lib/db';
const prefix = 'https://coding.net';

export default class Coding {
  // 根据code表的id查找access_token
  static async findTokenById(id){
    let res = await db.query('SELECT access_token FROM code WHERE id = ?', [id]);
    return res[0];
  }
  // 根据code表的id查找code信息
  static async findByIdWithoutToken(id) {
    let res = await db.query('SELECT id,name,logo FROM code WHERE id = ?', [id]);
    return res[0];
  }
  // 更新code表的token
  static async saveTokenById(code_id, access_token, refresh_token, expires_in) {
    return db.query('UPDATE code SET access_token = ? , refresh_token = ? ,expires_in = ? WHERE id = ?', [
      access_token, refresh_token, expires_in, code_id
    ]);
  }
  // 往code表里插入一条新的绑定信息
  static async createCode(user_id, access_token, refresh_token, expires_in) {
    const user = await Coding.user(access_token);
    console.log('拿到了coding账户的基本信息', user.global_key)
    let params = {
      id: uuid(),
      name: user.global_key,
      logo: user.avatar,
      access_token,
      refresh_token,
      expires_in
    }
    console.log(params);
    await db.query('INSERT INTO code SET ?', params);
    console.log('插入到code表里了')
    await db.query('UPDATE user SET coding_bind = ? WHERE id = ?', [params.id, user_id]);
    console.log('插入到user表里了')
  }
  // 获取用户个人信息
  static async user(access_token) {
    return Coding._get('/api/account/current_user', access_token);
  }
  // 获取用户的项目列表
  static async projects(access_token){
    return Coding._get('/api/user/projects',access_token);
  }
  // 获取用户某项目的webHook
  static async webHook(user_name, project_name) {
    return Coding._get(`/api/user/${user_name}/project/${project_name}/git/hooks`);
  }
  // 为某项目增加webHook
  static async addWebHook(options) {
    let token = '';
    let uri = `${prefix}/api/user/${options.user_name}/project/${options.project_name}/git/hook`
    let res = await request({
      method: 'POST',
      uri: uri,
      qs: {
        access_token: token,
      },
      form: {
        type_push:true,
        type_mr_pr:true,
        hook_url:options.hook_url
      }
    });
    return Coding.handleResponse(JSON.parse(res));
  }
  static async _get(api, access_token) {
    let token = access_token;
    let options = {
      uri: `${prefix}${api}`,
      qs: {
        access_token: token
      },
      json: true
    };
    let res = await request(options);
    return Coding.handleResponse(res);
  }
  static handleResponse(res) {
    if (res.code != 0) {
      // 出现错误,抛出错误信息
      throw res.msg;
    } else {
      return res.data;
    }
  }
}