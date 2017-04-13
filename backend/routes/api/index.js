import Router from 'koa-router';

import RouterMain from './main';
import RouterOpen from './open';
import RouterAuth from './auth';
import RouterCoding from './coding';
import RouterProject from './project';
import Response from '../../services/response';
const apiRouter = new Router(); // 所有的API路由

apiRouter.use('/main', RouterMain.routes(), RouterMain.allowedMethods());
apiRouter.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods());
apiRouter.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods());
apiRouter.use('/coding', RouterCoding.routes(), RouterCoding.allowedMethods());
apiRouter.use('/project', RouterProject.routes(), RouterProject.allowedMethods());
apiRouter.use('*', async (ctx, next) => {
  ctx.body = new Response(404, 'Not Found');
});
export default apiRouter;