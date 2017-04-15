import config from '../../package.json';
import compose from 'koa-compose';
import Router from 'koa-router';
import Response from '../services/response';
import apiRouter from './api';
import sessionRouter from './session';
import userRouter from './user';
const router = new Router();

async function renderIndex(ctx, next) {
  await ctx.render('./main', { port: config.port.devServer, env: process.env.NODE_ENV })
}
router.get('/', renderIndex);
router.use('/session', sessionRouter.routes(), sessionRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

router.get('*', renderIndex);

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
