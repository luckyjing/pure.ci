import {post, get, del} from '../utils/request';
const Prefix = PURE_CI_CONFIG.API_PREFIX;

export async function fetchCodingRepositories() {
  const res = await get(`${Prefix}/api/code/projects`);
  return res.data;
}
export async function createProject(data) {
  return post(`${Prefix}/api/project`, data);
}
export async function getProjectList(data) {
  return get(`${Prefix}/api/project`);
}
export async function getProjectDetail(id) {
  return get(`${Prefix}/api/project/${id}`);
}
export async function deleteProject(id) {
  return del(`${Prefix}/api/project/${id}`);
}
export async function getProjectJobList(id) {
  return get(`${Prefix}/api/project/${id}/job`);
}
export async function startJob(data) {
  return post(`${Prefix}/api/project/${data.project_id}/job`, data);
}
export async function saveWorkFlow(data) {
  return post(`${Prefix}/api/project/${data.project_id}/workflow`, data);
}
export async function jobDetail(data) {
  return get(`${Prefix}/api/project/${data.project_id}/job/${data.job_id}`);
}
export async function getTaskList(data) {
  return get(`${Prefix}/api/project/tasklist`);
}