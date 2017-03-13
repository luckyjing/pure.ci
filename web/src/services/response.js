export default class Response{
  /**
   * @param code {Number} 200|300|xxx  HTTP响应码
   * @param options {String|Object} 当code为200时，options为Object，否则为String，表明错误信息
   */
  constructor(code,options) {
    if(!code || !options){
      throw new TypeError('code can\'t be undefined');
    }
    this.code = code;
    if(code == 200){
      this.data = options;
    }else{
      this.errMsg = options;
    }
  }
}
