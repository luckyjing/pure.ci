/**
 * 本模块封装了对coding平台的openAPI处理
 */
import request from 'request-promise'
import Response from './response'
import { CodingOAuth } from './oauth'
const prefix = 'https://coding.net';

export default class Coding {
  // 获取用户个人信息
  static async user() {
    return Coding._get('/api/account/current_user');
  }
  static async webHook(user_name, project_name) {
    return Coding._get(`/api/user/${user_name}/project/${project_name}/git/hooks`);
  }
  // 增加webHook
  static async addWebHook(options) {
    let token = await CodingOAuth.getAccessToken();
    let uri = `${prefix}/api/user/${options.user_name}/project/${options.project_name}/git/hook`
    let res = await request({
      method: 'POST',
      uri: uri,
      qs: {
        access_token: token,
      },
      form: {
        ...options
      }
    });
    return Coding.handleResponse(JSON.parse(res));
  }
  static async _get(api) {
    let token = await CodingOAuth.getAccessToken();
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