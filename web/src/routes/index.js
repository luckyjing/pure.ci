'use strict';

import config from '../../package.json';
import compose from 'koa-compose';
import Router from 'koa-router';


import RouterMain from './main';
import RouterAuth from './auth';
import RouterOpen from './open';
import RouterMock from './mock';


const router = new Router();
const apiRouter = new Router();

apiRouter.use('/api',  RouterMain.routes(), RouterMain.allowedMethods())
apiRouter.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
apiRouter.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods())
apiRouter.use('/mock', RouterMock.routes(), RouterMock.allowedMethods())

/**
* 根路径返回首页
*/
router.get('/', async (ctx, next) => {
    // ctx.type = 'html'
    // ctx.body = require('fs').createReadStream(__dirname + '/../public/main.html')
    await ctx.render('./main',{
      port:config.port.devServer
    })
})

router.use('/api',apiRouter.routes(),apiRouter.allowedMethods())

/**
 * 未匹配路由，返回404
 */
router.get('*', async (ctx, next) => {
    ctx.body = { status : 404 }
})

export default function routes() {
    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    )
}
