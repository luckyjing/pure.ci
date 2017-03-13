'use strict';

import config from '../../package.json';
import compose from 'koa-compose';
import Router from 'koa-router';
import Response from '../services/response';

import RouterMain from './main';
// import RouterAuth from './auth';
import RouterOpen from './open';
import RouterMock from './mock';

const router = new Router(); // 总路由
const apiRouter = new Router(); // 所有的API路由
apiRouter.use('/api', RouterMain.routes(), RouterMain.allowedMethods());
// apiRouter.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods());
apiRouter.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods());
apiRouter.use('/mock', RouterMock.routes(), RouterMock.allowedMethods());
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

/**
 * 根路径返回首页
 */
router.get('/', async(ctx, next) => {
  await ctx.render('./main', {port: config.port.devServer})
});

/**
 * 未匹配路由，返回404
 */
router.get('*', async(ctx, next) => {
  ctx.body = new Response(404, 'Not Found');
});

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}