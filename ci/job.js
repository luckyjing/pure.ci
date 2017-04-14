import fs from 'fs';
import uuid from '../util/uuid';
import WorkFlow from './workflow';
import path from 'path';

export default class Job {
  constructor(workspace, workflowContent) {
    this.id = uuid();
    this.status = 0;
    this.duration = 0;
    this.start_time = Date.now();
    this.onFinish = () => { };
    let Logworkspace = path.join(workspace, `./log/job-${this.id}.log`);
    this.ctx = {
      log: function (content) {
        fs.appendFileSync(workspace, content);
      }
    };
    this.workFlow = new WorkFlow();
    this.workFlow.loadConfig(workflowContent);
  }
  getStatus() {
    return this.status;
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
    try {
      this.ctx.log(`[Start Job] ${this.id}`)
      await this.workFlow.run(this.ctx);
      this.success();
      this.ctx.log(`[Success Job] ${this.id}`)
    } catch (e) {
      this.fail();
      this.ctx.log(`[Error Job] ${this.id}`)
    } finally {
      this.duration = Date.now() - this.start_time;
      this.onFinish();
    }
  }
}