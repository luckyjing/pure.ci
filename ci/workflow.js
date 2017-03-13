import _ from 'lodash'
import TaskManager from './taskmanager'
export default class WorkFlow {
  constructor() {
    this.id = _.uniqueId();
    this.taskList = [];
  }

  /**
   * 往workflow里追加一条作业
   * @param key 作业索引
   * @param index 在指定位置插入作业 从数字1开始
   * @param config 作业运行参数
   * @return {boolean}
   */
  add(key, index, config = {}) {
    if (!index) {
      throw new Error('必须指定index');
    }
    this.taskList.splice(index - 1, 0, {
      key,
      config
    });
    return true;
  }

  recover(data) {
    this.taskList = JSON.parse(data);
  }

  save() {
    return JSON.stringify(this.taskList);
  }

  async run(ctx) {
    // 生成任务链数组，每个数组里是一个async Function
    let runChain = this.taskList.map(task => {
      let detailTask = TaskManager.get(task.key);
      return new detailTask(task.config);
    });
    for (let instance of runChain) {
      try {
        await instance.run(ctx);
      } catch (taskName) {
        throw taskName;
      }
    }
  }
}