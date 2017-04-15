import Router from 'koa-router';
import HttpCode from '../config/httpCode';

const router = new Router();
/**
 * 注册
 */
router.post('/', async (ctx, next) => {
  if (!ctx.user) {
    let query = ctx.request.body;
    if (!query.username || !query.password) {
      return ctx.body = new Response(300, 'username or password is undefined');
    }
    let user = new Account(query);
    try {
      await user.save();
      ctx.body = new Response(200, {
        msg: 'signup successful'
      });
    } catch (err) {
      ctx.body = new Response(500, err);
    }
  } else {
    ctx.body = new Response(300, 'you are already logged in the system!');
  }
});
export default router;