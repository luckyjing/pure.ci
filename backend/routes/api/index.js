import Router from 'koa-router';

import RouterMain from './main';
import RouterAuth from './auth';
import RouterCoding from './coding';
import RouterProject from './project';
import Response from '../../services/response';
import * as codingController from '../../controller/codingController';


export default function apiRouter(router) {
  router.use('/code', RouterCoding.routes(), RouterCoding.allowedMethods());
  router.use('/main', RouterMain.routes(), RouterMain.allowedMethods());
  router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods());
  router.use('/project', RouterProject.routes(), RouterProject.allowedMethods());
};