import Coding from '../services/coding';
import Response from '../services/response';
import HttpCode from '../config/httpCode';


export async function getWebHook(ctx, next) {
  let user_name = ctx.query.userName;
  let project_name = ctx.query.projectName;
  if (!user_name || !project_name) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    let res = await Coding.webHook(user_name, project_name);
    ctx.body = new Response(HttpCode.SUCCESS, res);
  } catch (e) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, e);
  }
}

export async function postWebHook(ctx, next) {
  let body = ctx.request.body;
  try {
    let res = await Coding.addWebHook(body);
    ctx.body = new Response(HttpCode.SUCCESS, res);
  } catch (e) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, e);
  }
}