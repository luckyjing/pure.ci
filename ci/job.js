import fs from 'fs';
import uuid from '../util/uuid';
import WorkFlow from './workflow';
import path from 'path';
import os from 'os';
import TaskManager from './taskmanager'
export default class Job {
  constructor(workspace, workflowContent, option = {}) {
    this.id = uuid();
    this.status = 0;
    this.duration = 0;
    this.start_time = Date.now();
    let Logworkspace = path.join(workspace, `./log/job-${this.id}.log`);
    this.ctx = {
      log: function (content) {
        console.log(content.toString());
        fs.appendFileSync(Logworkspace, content + os.EOL);
      },
      WORKSPACE: workspace,
      JOB_ID: this.id,
      ...option
    };
    this.workFlow = new WorkFlow();
    this
      .workFlow
      .loadConfig(workflowContent);
  }
  onFinish() {}
  getStatus() {
    return {
      status: this.status,
      workflowStatus: this
        .workFlow
        .getStatus()
    }
  }
  getDuration() {
    return this.duration;
  }
  success() {
    this.status = 2;
  }
  start() {
    this.status = 1;
  }
  fail(e) {
    this.status = -1;
    this
      .ctx
      .log(e);
  }
  async run() {
    this.start();
    this
      .ctx
      .log(`开始时间：${Date()}`);
    try {
      this
        .ctx
        .log(`[Start Job]`)
      await this
        .workFlow
        .run(this.ctx);
      this.success();
      this
        .ctx
        .log(`[Success Job]`)

    } catch (e) {
      this.fail(e);
      this
        .ctx
        .log(`[Error Job]`)
    } finally {
      this.duration = Date.now() - this.start_time;
      this.onFinish();
      this
        .ctx
        .log(`作业结束，耗时：${this.duration} ms`);
      const CleanTask = TaskManager.get('clean');
      const clean = new CleanTask();
      clean.name = 'clean';
      clean.run(this.ctx);
    }
  }
}