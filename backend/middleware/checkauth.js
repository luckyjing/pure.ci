'use strict';
import Response from '../services/response';

/**
 * 登录权限中间件，决定哪些接口需要进行权限校验
 * 出现在if语句内的表示不进行权限校验
 * @returns {Function}
 */
export default function checkauth() {
  return async function (ctx, next) {
    if (ctx.isAuthenticated() && (ctx.path == '/login' || ctx.path == '/signin') && ctx.path != '/session') {
      ctx.redirect('/');
    }

    if (ctx.isAuthenticated()
      || ctx.path.indexOf('user') >= 0
      || ctx.path.indexOf('session') >= 0
      || ctx.path === '/login'
      || ctx.path === '/signin'
    ) {
      await next()
    } else {
      ctx.redirect('/login');
    }

  }
}
