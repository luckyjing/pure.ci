import HttpCode from '../config/httpCode';

export default class Response {
  /**
   * @param code {HttpCode} HTTP响应码
   * @param options {String|Object} 当code为200时，options为Object，否则为String，表明错误信息
   */
  /**
   */
  constructor(code, options = '') {
    if (!code) {
      throw new TypeError('code can\'t be undefined');
    }
    this.code = code;
    if (code == HttpCode.SUCCESS) {
      this.data = options;
    } else {
      this.errMessage = options;
    }
  }
}
