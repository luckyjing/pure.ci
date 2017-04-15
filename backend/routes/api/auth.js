'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';
import { CodingOAuth } from '../../services/oauth';
import Response from '../../services/response';
import HttpCode from '../../config/httpCode';

const router = new Router();
/**
 * OAuth 绑定仓库
 */
router.get('/coding', async (ctx, next) => {
  let query = ctx.query;
  if (!query.code) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let access_token = await CodingOAuth.fetchAccessToken(query.code);
    // TODO: 存储到数据库里去
    ctx.redirect('/');
  } catch (e) {

  }
});

export default router;
