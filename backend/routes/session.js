import Router from 'koa-router';
import HttpCode from '../config/httpCode';
import Response from '../services/Response';
import passport from 'passport';
const router = new Router();

/**
 * 登录
 */
router.post('/', async (ctx, next) => {
  let middleware = passport.authenticate('local', async (err, user, info) => {
    if (err) {
      ctx.status = 500;
    }
    // 验证失败，user 将会被设置为false
    if (user === false) {
      ctx.body = new Response(HttpCode.unauthorized, info)
    } else {
      await ctx.login(user);
      ctx.body = new Response(HttpCode.SUCCESS, user);
    }
  });
  await middleware.call(this, ctx, next);
});

export default router;