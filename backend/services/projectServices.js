import projectOrm from './orm/project';
import shell from '../../util/shell';
import uuid from '../../util/uuid';
import * as file from '../../util/file';
import Job from '../../ci/job';
import path from 'path';
import fs from 'fs';
import {workspace} from '../config/config';
const runningProjectMap = {};
function getCwd(user_id, project_name) {
  return path.join(workspace, `${user_id}/${project_name}`);
}

const defaultWorkflow = fs.readFileSync(path.join(__dirname, '../config/workflow.yml'));

/**
 * 每一个Project都可以持续集成
 */
export default class ProjectServices {
  /**
   * TODO: 生成一个项目
   * @param {*} user_id 用户id
   * @param {*} project_name 项目名称
   * @param {*} repository_url 绑定的仓库URL
   * @param {*} repository_name 绑定的仓库名
   * @returns {string|*} projectId
   */
  static async initProject(user_id, project_name, repository_url, repository_name) {
    let project_id = uuid();
    let space = `${user_id}/${project_name}`;
    // 创建项目文件夹
    await shell('mkdir', [
      '-p', space
    ], workspace);
    // 创建日志目录
    await shell('mkdir', [
      '-p', 'log'
    ], getCwd(user_id, project_name));
    // 写入数据库
    await projectOrm.createProject(project_id, project_name, repository_url, repository_name, user_id);
    // 增加workflow
    await projectOrm.addWorkFlow(user_id, project_id, defaultWorkflow);
  }
  /**
   * TODO: 配置一个项目的工作流
   * @param {*} user_id 用户名称
   * @param {*} project_id
   * @param {*} workflow pipeline
   */
  static async addWorkFlow(user_id, project_id, workflow) {
    await projectOrm.addWorkFlow(user_id, project_id, workflow);
  }
  /**
   * TODO: 开始一个新的作业
   * @param {*} user_id 用户名称
   * @param {string} project_id
   */
  static async start(user_id, project_id, commit_msg, branch) {
    // job Table id,workflow,project_id,commit_msg,start_time,branch,status,duration
    let job_id = uuid();
    // 获取项目基本信息
    let {workflow, name: project_name} = await projectOrm.getProjectInfo(project_id, user_id);
    let cwd = getCwd(user_id, project_name);
    // 创建新的Job
    let job = new Job(cwd, workflow);
    // 构建成功后，更新数据库
    job.onFinish = () => {
      projectOrm.updateJob(job_id, job.workFlow.saveConfig(), job.getStatus(), job.getDuration());
      // 从缓存中删去
      delete runningProjectMap[job_id];
    };
    // 缓存此Job
    runningProjectMap[job.id] = job;
    // 写入数据库
    await projectOrm.createJob(job.id, job.workFlow.saveConfig(), project_id, commit_msg, branch, job.status);
  }
  /**
   * TODO: 更新一个项目的workflow，状态，持续时间
   */
  static async updateJob(job_id, workflow, status, duration) {
    await projectOrm.updateJob(job_id, workflow, status, duration);
  }
  /**
   * TODO: 获取项目列表
   */
  static async projectList(user_id) {
    return projectOrm.list(user_id);
  }
  /**
   * TODO: 获取一个项目的信息
   * @param {*} user_id 用户名称
   * @param {string} project_id
   */
  static async projectInfo(user_id, project_id) {}
  /**
   * TODO: 获取一个项目的任务列表
   * @param {*} user_id 用户名称
   * @param {string} project_id
   */
  static async jobList(user_id, project_id) {}
  /**
   * TODO: 获取一个项目一次作业的信息
   * @param {*} user_id
   * @param {*} project_id
   * @param {*} job_id
   */
  static async jobInfo(user_id, project_id, job_id) {}
  /**
   * TODO: 获取一个项目一次作业的状态
   * @param {*} user_id 用户名称
   * @param {*} id
   * @param {*} jobId
   */
  static async jobStatus(user_id, id, jobId) {}
  /**
   * TODO: 取消一次作业
   * @param {*} user_id 用户名称
   * @param {*} id
   * @param {*} jobId
   */
  static async cancelJob(user_id, id, jobId) {}
}