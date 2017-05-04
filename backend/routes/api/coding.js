'use strict';

import Router from 'koa-router';
import * as codingController from '../../controller/codingController';
const router = new Router();
router.get('/', ctx => {
  ctx.body = 'now at /code'
})

router.post('/recievehook', codingController.recieveWebHook);

router.get('/projects', codingController.getProjects);

router.post('/webhook', codingController.postWebHook);

export default router;