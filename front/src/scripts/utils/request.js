import {Modal} from 'antd';
const Alert = Modal.error;
// ====== Request Class ======

const defaultOptions = {
  credentials: 'include'
}
/**
 * TODO 针对特定key增加处理函数
 * @param {string} key 针对某种key的处理函数
 * @param {Function} fn 处理函数
 */
export function addHandler(key, fn) {
  ErrorHandlers[key] = fn;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options = {}) {
  // setDefault
  options = {
    ...defaultOptions,
    ...options
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => checkResponse(res, options)) // 接口通信成功，处理返回值
    .catch(err => handleError(err, options)); // 发生异常，进行兜底处理
}

/**
 *
 * @param {string} url - 请求的接口地址
 * @param {object} data - 请求参数
 * @param {object} options 传递给fetch API的参数
 */
export function post(url, data, options = {}) {
  return request(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      ...data
    }),
    ...options
  })
}
/**
 *
 * @param {string} url - 请求的接口地址
 * @param {object} data - 请求参数
 * @param {object} options 传递给fetch API的参数
 */
export function del(url, data = {}, options = {}) {
  return request(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      ...data
    }),
    ...options
  })
}
/**
 *
 * @param {string} url 请求的接口地址
 * @param {object} data 请求参数
 * @param {object} options 传递给fetch API的参数
 */
export function get(url, data = {}, options = {}) {
  return request(`${url}?${stringify(data)}`, {
    method: 'GET',
    ...options
  })
}

// ====== Response Class ======

class AbstractResponse {
  constructor(response, error) {
    if (response) {
      this.code = response.code;
      this.data = response.data;
    }
    this.error = error || null;
  }
}

/**
 * 错误时候的响应对象
 */
class ErrorResponse extends AbstractResponse {
  constructor(error) {
    super(null, error);
  }
}

/**
 * 接口正常时的返回对象
 */
class SuccessResponse extends AbstractResponse {
  constructor(response) {
    super(response, null);
  }
}

// ====== Util ======

/**
 * { a: 1, b: 2} ==> a=1&b=2
 */
function stringify(obj = {}) {
  return Object
    .keys(obj)
    .filter(k => obj[k] || + obj[k] === 0)
    .map(k => {
      let value = obj[k];
      if (typeof value == 'object') {
        value = encodeURIComponent(JSON.stringify(value))
      } else {
        value = encodeURIComponent(value)
      }
      return encodeURIComponent(k) + '=' + value;
    })
    .join('&');
}

// ====== 接口返回值处理具体逻辑 ======

const SUCCESS_CODE = '200';
const ErrorHandlers = {
  '400': function () {
    Alert({title: '提示', content: '您当前的会话已超时，请重新登录。', onOk() {}})
  },
  'verifyCodeInvalid': () => {},
  'NoPermission.Directory': function () {
    //TODO: do nothing
  }
}

/**
 * 接口返回值处理逻辑，如果未捕获到匹配的处置方案，则抛出异常
 * @param {*} response
 * @param {*} options 配置可选项，如忽略错误
 */
function checkResponse(response, options) {
  const {code, message} = response;
  if (code == SUCCESS_CODE) {
    return new SuccessResponse(response);
  }
  throw new ErrorResponse(response);
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

let dialogInstance;

function handleError(err) {
  if (dialogInstance) 
    return;
  dialogInstance = Alert({
    content: JSON.stringify(err),
    okText: '好',
    onOk() {
      dialogInstance = null;
    }
  })
  throw new ErrorResponse(err);
}
