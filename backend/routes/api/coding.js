'use strict';

import Router from 'koa-router';
import * as codingController from '../../controller/codingController';
const router = new Router();

router.get('/projects', codingController.getProjects);

router.post('/webhook', codingController.postWebHook);

export default router;