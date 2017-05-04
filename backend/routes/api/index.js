import Router from 'koa-router';

import RouterMain from './main';
import RouterAuth from './auth';
import RouterCoding from './coding';
import RouterProject from './project';
import Response from '../../services/response';
export default function apiRouter(router) {
  router.use('/api/code', RouterCoding.routes(), RouterCoding.allowedMethods());
  router.use('/api/main', RouterMain.routes(), RouterMain.allowedMethods());
  router.use('/api/auth', RouterAuth.routes(), RouterAuth.allowedMethods());
  router.use('/api/project', RouterProject.routes(), RouterProject.allowedMethods());
};