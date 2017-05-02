import HttpCode from '../config/httpCode';
import UserOrm from '../services/orm/user';
import CodingOrm from '../services/orm/coding';
import Response from '../services/response';

import config from '../config/config';

export async function checkEmail(ctx, next) {
  let query = ctx.query.email;
  if (!query) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM, '未传递邮箱');
  }
  try {
    let isUnique = await UserOrm.isUniqueEmail(query);
    if (!isUnique) {
      return ctx.body = new Response(HttpCode.OTHER_ERROR, '邮箱已存在');
    }
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (error) {
    ctx.status = 500;
  }
}
export async function register(ctx, next) {
  let query = ctx.request.body;
  try {
    let isUnique = await UserOrm.isUniqueEmail(query.email);
    if (!isUnique) {
      return ctx.body = new Response(HttpCode.OTHER_ERROR, '邮箱已存在');
    }
    await UserOrm.addUser(query.nickname, query.email, query.password);
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
}
export async function getUserInfo(ctx, next) {
  let userid = ctx.state.user && ctx.state.user.id;
  if(!userid){
    return ctx.redirect('/login');
  }
  let userinfo = await UserOrm.findOneById(userid);
  if (userinfo.coding_bind) {
    // 如果代码已经关联了，则查找代码仓库信息
    let codingInfo = await CodingOrm.findByIdWithoutToken(userinfo.coding_bind);
    delete codingInfo.coding_bind ;
    userinfo.coding = codingInfo;
  } else {
    userinfo.coding = null;
  }
  userinfo.client_id = config.coding.clientId;
  userinfo.redirect_uri = config.coding.redirect_uri;
  ctx.body = new Response(HttpCode.SUCCESS, userinfo);
}