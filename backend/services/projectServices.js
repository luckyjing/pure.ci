import projectOrm from './orm/project';
import codingOrm from './orm/coding';
import shell from '../../util/shell';
import uuid from '../../util/uuid';
import * as file from '../../util/file';
import Job from '../../ci/job';
import path from 'path';
import fs from 'fs';
import {workspace, hook_url, deploy_key, registry} from '../config/config';
const runningProjectMap = {};
function getBaseWorkSpace(user_id) {
  return path.join(workspace, `${user_id}`);
}
function getCwd(user_id, project_id) {
  return path.join(workspace, `${user_id}/${project_id}`);
}

const defaultWorkflow = fs.readFileSync(path.join(__dirname, '../config/workflow.yml'));

/**
 * 每一个Project都可以持续集成
 */
export default class ProjectServices {
  /**
   * 生成一个项目
   * @param {*} user_id 用户id
   * @param {*} project_name 项目名称
   * @param {*} repository_url 绑定的仓库URL
   * @param {*} repository_name 绑定的仓库名
   * @returns {string|*} projectId
   */

  static async initProject(ctx, user_id, project_name, repository_url, repository_name) {
    const project_id = uuid();
    const space = `${user_id}/${project_id}`;
    // 增加WebHook
    const {access_token, coding_name} = ctx.state.user;
    await codingOrm.addWebHook(access_token, coding_name, repository_name, hook_url);
    // 添加部署公钥 创建项目文件夹
    try {
      await codingOrm.addDeployKey(access_token, coding_name, repository_name, deploy_key);
    } catch (error) {
      console.log(error);
    }
    console.log('公钥添加完毕');
    await shell('mkdir', [
      '-p', space
    ], workspace);
    // 创建日志目录
    await shell('mkdir', [
      '-p', 'log'
    ], getCwd(user_id, project_id));
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
   * 开始一个新的作业
   * @param {*} user_id 用户id
   * @param {string} project_id 项目id
   * @param {stirng} commit_msg 代码commit信息
   * @param {string} branch 触发分支
   */
  static async startJob(user_id, project_id, commit_msg, branch) {
    console.log('-----启动一项新的作业------');
    // 项目作业空间
    const cwd = getCwd(user_id, project_id);
    console.log(`项目作业空间初始化  ${cwd}`);
    const projectInfo = await projectOrm.getProjectInfo(project_id, user_id);
    const workflow = projectInfo.workflow;
    console.log('获取workflow完成');
    const option = {
      PROJECT_ID: projectInfo.id,
      REPOSITORY_NAME: projectInfo.repository_name,
      REPOSITORY_URL: projectInfo.repository_url,
      BRANCH: branch,
      REGISTRY: registry
    }
    // 创建新的Job
    const job = new Job(cwd, workflow, option);
    console.log('新作业实例化完成');
    // 构建成功后，更新数据库，从缓存中删去
    job.onFinish = async() => {
      console.log(`作业完成，目前状态:${job.getStatus()},共耗时:${job.getDuration()}`)
      await projectOrm.updateJob(job.id, job.workFlow.saveConfig(), job.getStatus().status, job.getDuration());
      console.log('执行结果写入数据库完成');
      delete runningProjectMap[job.id];
    };
    // 缓存此Job
    runningProjectMap[job.id] = job;
    // 将作业信息写入数据库
    await projectOrm.createJob(job.id, job.workFlow.saveConfig(), project_id, commit_msg, branch, job.status);
    console.log(`作业信息已经写入数据库`);
    // 启动作业
    job.run();
  }
  /**
   * 更新一个项目的workflow，状态，持续时间
   */
  static async updateJob(job_id, workflow, status, duration) {
    await projectOrm.updateJob(job_id, workflow, status, duration);
  }
  /**
   * 获取项目列表
   */
  static async projectList(user_id) {
    return projectOrm.list(user_id);
  }
  /**
   * 获取一个项目的信息
   * @param {*} access_token
   * @param {*} user_id 用户id
   * @param {string} project_id
   */
  static async projectInfo(coding_name, access_token, project_id, user_id) {
    const projectInfo = await projectOrm.getProjectInfo(project_id, user_id);
    const branches = await codingOrm.branches(coding_name, projectInfo.repository_name, access_token)
    projectInfo.branches = branches.list;
    return projectInfo;
  }

  /**
   *  获取一个项目的任务列表
   * @param {string} project_id 项目id
   */
  static async jobList(project_id) {
    return projectOrm.jobList(project_id);
  }
  /**
   * TODO: 获取一个项目一次作业的信息
   * @param {*} user_id
   * @param {*} project_id
   * @param {*} job_id
   */
  static async jobInfo(user_id, project_id, job_id) {
    // 获取基本信息
    const info = await projectOrm.jobInfo(job_id);
    const workspace = getCwd(user_id, project_id);
    // 获取日志信息,项目作业空间
    const log = await file.read(path.join(workspace, `./log/job-${job_id}.log`));
    info.log = log;
    if (runningProjectMap[job_id]) {
      // 任务正在运行中，从runnning中取出当前进度
      const jobStatus = runningProjectMap[job_id].getStatus();
      console.log(jobStatus);
      const {status, workflowStatus} = jobStatus;
      info.runningStatus = workflowStatus;
      info.status = status;
    }
    return info;
  }
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
  /**
   * 删除一个项目
   */
  static async deleteProject(user_id, project_id) {
    console.log(`准备删除用户id为${user_id}的项目${project_id}`);
    // 删除workspace
    const workspace = getBaseWorkSpace(user_id);
    console.log(`shell工作目录为${workspace}`);
    await shell('rm', [
      '-rf', project_id
    ], workspace);
    // 清空相关的Job和Project条目
    await projectOrm.deleteProject(project_id);
    console.log(`删除成功`);
  }
}