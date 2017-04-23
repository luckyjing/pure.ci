/**
 * 负责处理各大平台的OAuth关联逻辑
 */
import request from 'request-promise'
import Response from './response'
import { coding } from '../config/config'

class OAuth {
  constructor(clientId, clientSecret, scope) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scope = scope;
  }
  /**
   * 根据授权code获取用户的access_token
   * @param code {string} 验证code
   */
  async fetchAccessToken(code) {
    let options = {
      uri: `https://coding.net/api/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=authorization_code&code=${code}`,
      json: true
    };
    let res = await request(options);
    /**
     * @example
     * { expires_in: "271645",  refresh_token: "xxxxxx", access_token:"xxxxxx" }
     */
    return res;
  }
}
export const CodingOAuth = new OAuth(coding.clientId, coding.clientSecret);
