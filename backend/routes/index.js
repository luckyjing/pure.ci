import config from '../../package.json';
import compose from 'koa-compose';
import Router from 'koa-router';
import Response from '../services/response';
import apiRouter from './api';

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('./main', { port: config.port.devServer })
});
 
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

router.get('*', async (ctx, next) => {
  ctx.body = new Response(404, 'Not Found');
});

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
