import config from '../../package.json';
import compose from 'koa-compose';
import Router from 'koa-router';
import Response from '../services/response';
import apiRouter from './api';

const router = new Router();

async function renderIndex(ctx, next) {
  await ctx.render('./main', { port: config.port.devServer, env: process.env.NODE_ENV })
}
router.get('/', renderIndex);
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

router.get('*', renderIndex);

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
