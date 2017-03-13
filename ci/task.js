import _ from 'lodash'

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

  async run() {
  }
}
export default function TaskFactory(config) {
  let detailTask = class extends Task {
    constructor(config) {
      super(config);
    }

    async context(ctx) {
      return config.context.bind(this)(ctx);
    }

    fail() {
      super.fail();
      throw detailTask.taskName;
    }

    async run(ctx) {
      console.log(`--- [Start]${config.name}  ---`)
      this.start();
      await this.context(ctx);
      console.log(`--- [Finish]${config.name} ---`)

    }
  };
  detailTask.key = config.key || "";
  detailTask.taskName = config.name || "";
  detailTask.description = config.description || "";
  return detailTask;
}