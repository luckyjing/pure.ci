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

function fetchHtml() {
  return 'hi'
}

/**
 * 根路径返回首页
 */
router.get('/', async (ctx, next) => {
  var htmlFile = await (new Promise(function (resolve, reject) {
    fs.readFile('http://g.alicdn.com/aliyun/jingxin-test-normal/0.0.1/index.html', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }))
  ctx.type = 'html';
  ctx.body = htmlFile;
  await ctx.render('./index', { port: config.port.devServer })
});

/**
 * 未匹配路由，返回404
 */
router.get('*', async (ctx, next) => {
  ctx.body = new Response(404, 'Not Found');
});

export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
