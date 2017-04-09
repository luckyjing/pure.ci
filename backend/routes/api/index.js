import Router from 'koa-router';

import RouterMain from './main';
import RouterOpen from './open';
import RouterMock from './mock';
// import RouterAuth from './auth';

const apiRouter = new Router(); // 所有的API路由

apiRouter.use('/main', RouterMain.routes(), RouterMain.allowedMethods());
// apiRouter.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods());
apiRouter.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods());
apiRouter.use('/mock', RouterMock.routes(), RouterMock.allowedMethods());
export default apiRouter;