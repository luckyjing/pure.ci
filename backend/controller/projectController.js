import Project from '../services/projectServices';
import Response from '../services/response';
import HttpCode from '../config/httpCode';
import {notNull} from '../../util/test.js';
import uuid from '../../util/uuid';

export async function initProject(ctx, next) {
  let {name, repository_url, repository_name} = ctx.request.body;
  if (!notNull([name, repository_url, repository_name])) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    await Project.initProject(ctx, ctx.state.user.id, name, repository_url, repository_name);
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (error) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, error);
  }
}
export async function projectList(ctx, next) {
  let user_id = ctx.state.user.id;
  try {
    const projectList = await Project.projectList(user_id);
    ctx.body = new Response(HttpCode.SUCCESS, projectList);
  } catch (error) {}
}
export async function projectInfo(ctx, next) {
  const user_id = ctx.state.user.id;
  const project_id = ctx.params.project_id;
  if (!notNull([project_id])) {
    return ctx.body = new Response(HttpCode.MISSING_PARAM);
  }
  try {
    const projectInfo = await Project.projectInfo(ctx.state.user.coding_name, ctx.state.user.access_token, project_id, user_id);
    ctx.body = new Response(HttpCode.SUCCESS, projectInfo);
  } catch (error) {
    ctx.body = new Response(HttpCode.OTHER_ERROR, error);
    console.log(error)
  }
}
export async function addWorkFlow(ctx, next) {
  // this.request.body = { key:value }
  let user_id = 'faked';
  let workflow = 'faked';
  try {
    await Project.addWorkFlow(user_id, workflow);
  } catch (error) {}
}
export async function createJob(ctx, next) {
  const user_id = ctx.state.user.id;
  const project_id = ctx.params.project_id;
  const {project_name, workflow, commit_msg, branch} = ctx.request.body;
  try {
    await Project.startJob(user_id, project_id, project_name, workflow, commit_msg, branch);
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (error) {
    ctx.body = new Response(HttpCode.OTHER_ERROR);
    console.log(error);
  }

}
export async function jobList(ctx, next) {
  const project_id = ctx.params.project_id;
  try {
    const jobList = await Project.jobList(project_id);
    ctx.body = new Response(HttpCode.SUCCESS, jobList);
  } catch (error) {

    ctx.body = new Response(HttpCode.OTHER_ERROR);
    console.log(error);
  }
}
export async function jobInfo(ctx, next) {}
export async function jobStatus(ctx, next) {}

export async function deleteProject(ctx, next) {
  const project_id = ctx.params.project_id;
  const user_id = ctx.state.user.id;
  try {
    await Project.deleteProject(user_id, project_id);
    ctx.body = new Response(HttpCode.SUCCESS);
  } catch (error) {
    ctx.body = new Response(HttpCode.OTHER_ERROR);
    console.log(error);
  }
}