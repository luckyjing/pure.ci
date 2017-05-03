import CodingOrm from '../services/orm/coding';
import Response from '../services/response';
import HttpCode from '../config/httpCode';
import {CodingOAuth} from '../services/oauth';
import {hook_url} from '../config/config';
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
// 接收到远端的webhook推送，启动作业
export async function recieveWebHook(ctx, next) {
  const header = ctx.header;
  console.log(header);
}
// 增加webhook
export async function postWebHook(ctx, next) {
  let body = ctx.request.body;
  body.hook_url = hook_url;
  try {
    let res = await CodingOrm.addWebHook(body);
    ctx.body = new Response(HttpCode.SUCCESS, res);
  } catch (e) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, e);
  }
}

// 将获取到的access_token存入到数据库里

export async function bind(ctx, next) {
  let query = ctx.query;
  if (!query.code) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let {access_token, refresh_token, expires_in} = await CodingOAuth.fetchAccessToken(query.code);
    // TODO: 存储到数据库里去
    let user = ctx.state.user;
    if (user.coding_bind) {
      console.log(`${user.id}绑定过coding->重新写入token`)
      // 已经绑定了，只需要写入数据即可
      try {
        await CodingOrm.saveTokenById(user.coding_bind, access_token, refresh_token, expires_in);
        console.log('写入数据库完毕')
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(`${user.id}未绑定过coding`);
      // 先创建code，然后再写入用户表
      await CodingOrm.createCode(user.id, access_token, refresh_token, expires_in);
      console.log(`绑定成功`);
    }
    ctx.redirect('/');
  } catch (e) {}
}
// 获取所有项目列表
export async function getProjects(ctx, next) {
  console.log(ctx.state.user);
  const token = ctx.state.user.access_token;
  let res = await CodingOrm.projects(token);
  res = res
    .list
    .map(item => {
      return {repository_url: item.ssh_url, repository_name: item.name, id: item.id}
    })
  ctx.body = new Response(HttpCode.SUCCESS, res);
}