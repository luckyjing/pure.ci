'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import cors from 'koa-cors';
import Serve from 'koa-static';
import Logger from 'koa-logger';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import views from 'koa-views';
import path from 'path';
import passport from 'koa-passport';
import auth from './auth';

export default function (app) {

  app.keys = ['secret'];
  app.proxy = true;
  app.use(views(__dirname + '/../views', {extension: 'swig'}))
  app.use(convert(cors()));
  app.use(convert(Logger()));
  app.use(bodyParser({
    onerror: function (err, ctx) {
      ctx.throw('body parse error', 422);
    }
  }));
  app.use(convert(Serve(path.join(__dirname, '../public'))));
  app.use(convert(session()));

  //auth
  auth();
  app.use(passport.initialize());
  app.use(passport.session());
}
