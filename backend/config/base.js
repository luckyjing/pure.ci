'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import cors from 'kcors';
import Serve from 'koa-static';
import Logger from 'koa-logger';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import views from 'koa-views';

/**
 * 权限校验模块
 */
import passport from 'koa-passport';
// import passportInit from './passport';


export default function middleware(app) {
  // passportInit(passport);
  app.proxy = true;

  app.use(cors({credentials: true}));
  app.use(convert(Logger()));
  app.use(bodyParser());
  app.use(mount("/static", convert(Serve(__dirname + '/../public/'))));

  app.keys = ['secret'];
  app.use(convert(session()));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(views(__dirname + '/../views', {extension: 'swig'}))

}