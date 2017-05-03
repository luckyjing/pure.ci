import {post, get, del} from '../utils/request';
const Prefix = PURE_CI_CONFIG.API_PREFIX;

export async function fetchCodingRepositories() {
  const res = await get(`${Prefix}/code/projects`);
  return res.data;
}
export async function createProject(data) {
  return post(`${Prefix}/project`, data);
}
export async function getProjectList(data) {
  return get(`${Prefix}/project`);
}
export async function getProjectDetail(id) {
  return get(`${Prefix}/project/${id}`);
}
export async function deleteProject(id) {
  return del(`${Prefix}/project/${id}`);
}
export async function getProjectJobList(id) {
  return get(`${Prefix}/project/${id}/job`);
}
export async function startJob(data) {
  return post(`${Prefix}/project/${data.project_id}/job`, data);
}
export async function saveWorkFlow(data) {
  return post(`${Prefix}/project/${data.project_id}/workflow`, data);
}
export async function jobDetail(data) {
  return get(`${Prefix}/project/${data.project_id}/job/${data.job_id}`);
}