/**
 * 负责处理各大平台的OAuth逻辑
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
    return res.access_token;
  }
  async getAccessToken() {
    return '5c8b81ddcf31426083157096abe88b6f';
  }
}
export const CodingOAuth = new OAuth(coding.clientId, coding.clientSecret);




// https://coding.net/oauth_authorize.html?client_id=eb1f4fffdad9ebae384f83e1de7ba4d7&redirect_uri=http%3A%2F%2Flocalhost%3A8999%2Fapi%2Fauth%2Fcoding&response_type=code&scope=user%2Cuser%3Aemail%2Cnotification%2Cproject%2Cproject%3Adepot%2Cproject%3Akey

// https://coding.net/oauth_authorize.html?client_id=ff404fd47912cbf92993437c2ac3456c&redirect_uri=https%3A%2F%2Fci.daocloud.io%2Fapi%2Ftokens%2Fcallbackhandler%2Fcoding.net&response_type=code&scope=user%2Cuser%3Aemail%2Cnotification%2Cproject%2Cproject%3Adepot%2Cproject%3Akey&state=96ac604f-c281-4ebe-a2b1-e60495dcad95