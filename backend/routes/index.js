import config from '../../front/package.json';
import compose from 'koa-compose';
import Router from 'koa-router';
import Response from '../services/response';
import apiRouter from './api/index';
import sessionRouter from './session';
import userRouter from './user';
const router = new Router();

/**
 * 注入到页面里的变量
 */
const renderParams = {
  port: config.port.dev,
  env: process.env.NODE_ENV
}

router.use('/session', sessionRouter.routes(), sessionRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
apiRouter(router);
router.get('/', async (ctx, next) => {
  await ctx.render('./index', renderParams)
});
router.get('/login', async (ctx, next) => {
  await ctx.render('./login', renderParams)
});
router.get('/signin', async (ctx, next) => {
  await ctx.render('./login', renderParams)
});
router.get('/logout', async (ctx, next) => {
  ctx.logout()
  ctx.redirect('/login');
});
// router.get('*', async (ctx, next) => {
//   await ctx.render('./index', renderParams)
// });

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
