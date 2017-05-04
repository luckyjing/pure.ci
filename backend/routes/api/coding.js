'use strict';

import Router from 'koa-router';
import * as codingController from '../../controller/codingController';
const router = new Router();

router.post('/recievehook', codingController.recieveWebHook);
router.post('/webhook', codingController.postWebHook);

router.get('/projects', codingController.getProjects);
export default router;