import fs from 'fs';
import uuid from '../util/uuid';
import WorkFlow from './workflow';
import path from 'path';
import os from 'os';
export default class Job {
  constructor(workspace, workflowContent) {
    this.id = uuid();
    this.status = 0;
    this.duration = 0;
    this.start_time = Date.now();
    let Logworkspace = path.join(workspace, `./log/job-${this.id}.log`);
    this.ctx = {
      log: function (content) {
        console.log(content);
        fs.appendFileSync(Logworkspace, content + os.EOL);
      }
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
  fail() {
    this.status = -1;
  }
  async run() {
    this.start();
    this
      .ctx
      .log(`作业启动，开始时间：${Date()}`);
    try {
      this
        .ctx
        .log(`[Start Job] ${this.id}`)
      await this
        .workFlow
        .run(this.ctx);
      this.success();
      this
        .ctx
        .log(`[Success Job] ${this.id}`)

    } catch (e) {
      this.fail();
      this
        .ctx
        .log(`[Error Job] ${this.id}`)
    } finally {
      this.duration = Date.now() - this.start_time;
      this.onFinish();
      this
        .ctx
        .log(`作业结束，耗时：${this.duration} ms`);
    }
  }
}