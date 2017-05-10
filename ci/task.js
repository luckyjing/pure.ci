import _ from 'lodash'
import chalk from 'chalk';
/**
 * 任务类，代表了运行的一个基本单位
 * 静态属性：key,name,context,description
 * 成员变量：status 0 未运行 1 运行中 2 运行成功 -1 运行失败
 */
class Task {
  constructor(config) {
    this.id = _.uniqueId();
    this.status = 0;
    this.config = config || {};
  }

  getStatus() {
    return this.status;
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

  async run() {}
}
export default function TaskFactory(config) {
  let detailTask = class extends Task {
    constructor(cfg) {
      super({
        ...config,
        ...cfg
      });
    }

    async context(ctx) {
      return config
        .context
        .bind(this)(ctx);
    }

    fail(e) {
      super.fail();
      throw e;
    }

    async run(ctx, cb) {
      ctx.log('[Start Task]' + ` ${this.name}  ${this.config.taskName}`);
      this.start();
      cb(this.getStatus());
      try {
        await this.context(ctx);
        ctx.log('[Finish Task]' + ` ${this.name}`);
      } catch (e) {
        ctx.log(e);
        ctx.log('[Error Task]' + ` ${this.name}`);
        throw e;
      }

    }
  };
  detailTask.key = config.key || "";
  detailTask.taskName = config.taskName || "";
  detailTask.desc = config.desc || "";
  return detailTask;
}