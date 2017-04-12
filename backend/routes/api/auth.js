'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';
import { CodingOAuth } from '../../services/oauth';
import Response from '../../services/response';
import HttpCode from '../../config/httpCode';

const router = new Router();


/**
 * 登录
 */
// router.post('/signin', async (ctx, next) => {
//   let middleware = passport.authenticate('local', async (err, user, info) => {
//     if (err) {
//       throw err;
//     }
//     // 验证失败，user 将会被设置为false
//     if (user === false) {
//       ctx.body = new Response(400, info)
//     } else {
//       await ctx.login(user);
//       ctx.body = new Response(200, {
//         user
//       })
//     }
//   });
//   await middleware.call(this, ctx, next)
// });

/**
 * 登出
 */
// router.get('/logout', async (ctx, next) => {
//   ctx.logout();
//   ctx.redirect('/')
// });

/**
 * 获取登录状态
 */
// router.get('/status', async (ctx, next) => {
//   ctx.body = new Response(200, {
//     "isLogin": ctx.isAuthenticated()
//   })
// });
/**
 * 注册
 */
// router.post('/signup', async (ctx, next) => {
//   if (!ctx.user) {
//     let query = ctx.request.body;
//     if (!query.username || !query.password) {
//       return ctx.body = new Response(300, 'username or password is undefined');
//     }
//     let user = new Account(query);
//     try {
//       await user.save();
//       ctx.body = new Response(200, {
//         msg: 'signup successful'
//       });
//     } catch (err) {
//       ctx.body = new Response(500, err);
//     }
//   } else {
//     ctx.body = new Response(300, 'you are already logged in the system!');
//   }
// });
/**
 * OAuth 绑定仓库
 */
router.get('/coding', async (ctx, next) => {
  let query = ctx.query;
  if (!query.code) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let access_token = await CodingOAuth.fetchAccessToken(query.code);
    // TODO: 存储到数据库里去
    ctx.redirect('/');
  } catch (e) {

  }
});

export default router;
