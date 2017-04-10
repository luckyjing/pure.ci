'use strict';

import db from './lib/db';
import Koa from 'koa';
import appConfig from './config/appConfig';
import middleware from './middleware';
import routes from './routes';
import config from './config/config';
import log4js from 'log4js';

const app = new Koa();
const LOG = log4js.getLogger('file');


//configure basic app
appConfig(app);

//configure custom middleware
app.use(middleware());

//configure custom routes
app.use(routes());

app.listen(config.app.port);
LOG.info("Server started, listening on port: " + config.app.port);