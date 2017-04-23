import CodingOrm from '../services/orm/coding';
import Response from '../services/response';
import HttpCode from '../config/httpCode';
import { CodingOAuth } from '../services/oauth';

export async function getWebHook(ctx, next) {
  let user_name = ctx.query.userName;
  let project_name = ctx.query.projectName;
  if (!user_name || !project_name) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let res = await CodingOrm.webHook(user_name, project_name);
    ctx.body = new Response(HttpCode.SUCCESS, res);
  } catch (e) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, e);
  }
}

export async function postWebHook(ctx, next) {
  let body = ctx.request.body;
  try {
    let res = await CodingOrm.addWebHook(body);
    ctx.body = new Response(HttpCode.SUCCESS, res);
  } catch (e) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, e);
  }
}


// 将获取到的access_token存入到数据库里

export async function bind(ctx, next) {
  console.log('执行了bind方法')
  let query = ctx.query;
  if (!query.code) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let { access_token, refresh_token, expires_in } = await CodingOAuth.fetchAccessToken(query.code);
    console.log('拿到了token', access_token)
    // TODO: 存储到数据库里去
    let user = ctx.state.user;
    if (user.coding_bind) {
      console.log('已经绑定了')
      // 已经绑定了，只需要写入数据即可
      await CodingOrm.saveTokenById(user.coding_bind, access_token, refresh_token, expires_in);
    } else {
      console.log('第一次绑定', user.id)
      // 先创建code，然后再写入用户表
      await CodingOrm.createCode(user.id, access_token, refresh_token, expires_in);
    }
    ctx.redirect('/');
  } catch (e) {

  }
}