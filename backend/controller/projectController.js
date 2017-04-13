import Project from '../services/projectServices';
import Response from '../services/response';
import HttpCode from '../config/httpCode';
import { notNull } from '../../util/test.js';

export async function initProject(ctx, next) {
  let { name, reposiroty_url, repository_name } = ctx.query;
  if (!notNull([name, reposiroty_url, repository_name])) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  let user_id = 'faked';
  try {
    await Project.initProject(user_id, name, reposiroty_url, repository_name);
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (error) {

  }
}
export async function projectList(ctx, next) {
  let user_id = 'faked';
  try {
    await Project.projectList(user_id);
  } catch (error) {

  }
}
export async function projectInfo(ctx, next) {
  let user_id = 'faked';
  let project_id = ctx.query.project_id;
  if (!notNull([project_id])) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    await Project.projectInfo(user_id, project_id);
  } catch (error) {

  }
}
export async function addWorkFlow(ctx, next) {
  // this.request.body = { key:value }
  let user_id = 'faked';
  let workflow = 'faked';
  try {
    await Project.addWorkFlow(user_id, workflow);
  } catch (error) {

  }
}
export async function jobList(ctx, next) {

}
export async function jobInfo(ctx, next) {

}
export async function jobStatus(ctx, next) {

}