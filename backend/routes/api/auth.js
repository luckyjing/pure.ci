import Router from 'koa-router';

import * as CodingController from '../../controller/codingController';
const router = new Router();
/**
 * OAuth 绑定仓库
 * 授权成功后的回调地址，从接口中获取code，根据
 * 这个code去获取access_token 和 refresh_token,expires_in
 */
router.get('/coding', CodingController.bind);

export default router;
