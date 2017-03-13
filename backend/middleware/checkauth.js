'use strict';
import Response from '../services/response';

/**
 * 登录权限中间件，决定哪些接口需要进行权限校验
 * 出现在if语句内的表示不进行权限校验
 * @returns {Function}
 */
export default function checkauth() {
  return async function (ctx, next) {
    if (ctx.isAuthenticated()
      || ctx.path.indexOf('/auth/') >= 0
      || ctx.path.indexOf('/open/') >= 0
      || ctx.path === '/'
      || ctx.path.indexOf('.html') >= 0) {
      await next()
    } else {
      ctx.body = new Response(401, 'Unauthorized');
    }
  }
}
