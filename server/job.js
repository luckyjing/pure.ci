import _ from 'lodash'

export default class Job {
  constructor(workflow) {
    this.id = _.uniqueId();
    this.workFlow = workflow;
  }

  async run() {
    try {
      await this.workFlow.run();
    } catch (taskName) {
      console.log(`Job失败，在执行 ${taskName} 时`);
    }
  }
}