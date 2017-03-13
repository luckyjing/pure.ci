import _ from 'lodash'

export default class Job {
  constructor(workflow) {
    this.id = _.uniqueId();
    this.ctx = {};
    this.workFlow = workflow;
  }

  async run() {
    try {
      await this.workFlow.run(this.ctx);
    } catch (taskName) {
      console.log(`Job失败，在执行 ${taskName} 时`);
    }
  }
}