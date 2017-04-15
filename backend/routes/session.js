import Router from 'koa-router';
import HttpCode from '../config/httpCode';

const router = new Router();

/**
 * 登录
 */
router.post('/', async (ctx, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      ctx.status = 500;
    }
    // 验证失败，user 将会被设置为false
    if (user === false) {
      ctx.body = new Response(HttpCode.unauthorized, info)
    } else {
      await ctx.login(user);
      ctx.body = new Response(HttpCode.SUCCESS)
    }
  });
});

/**
 * 登出
 */
router.delete('/', async (ctx, next) => {
  ctx.logout();
  ctx.redirect('/')
});

export default router;