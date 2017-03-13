export function namespace(prefix, TYPE) {
  if (TYPE._init_) {
    // 多个文件里同时引入TYPE,其在内存里共享一份,故需保证增加命名空间操作只执行一次
    return TYPE;
  }
  for (var key in TYPE) {
    TYPE[key] = `${prefix.toUpperCase()}/${TYPE[key]}`;
  }
  TYPE._init_ = true;
}
export function requireAll(r, filter = true) {
  let keys = r.keys();
  let result = [];
  for (let i = 0, len = keys.length; i < len; i++) {
    if (filter || filter.call(null, keys[i])) {
      result.push(r(keys[i]));
    }
  }
  return result;
}
const Auth = {
  isLogin(){
    return fetch('/auth/status', {
      credentials: 'same-origin'
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        return res.isLogin != false;
      })
  }
};

import {hashHistory} from 'react-router'
export function requireAuth(nextState, replace) {
  let name = nextState.location.pathname;
  if (name.indexOf('sign') < 0) {
    Auth.isLogin().then(login=> {
      if (!login) {
        hashHistory.push('/signin');
      }
    })
  }
}
