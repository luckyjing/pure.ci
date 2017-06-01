import _ from 'lodash'
import TaskFactory from './task'

import TaskConfig from './taskconfig/index';
const TaskManager = {
  _store: new Map(),
  init() {
    for (let key in TaskConfig) {
      let config = TaskConfig[key];
      let task = TaskFactory(config);
      this
        ._store
        .set(task.key, task);
    }
  },
  get(key) {
    return this
      ._store
      .get(key);
  },
  list() {
    let result = [];
    for (let [key,
      value]of this._store) {
      result.push({key: value.key, taskName: value.taskName, desc: value.desc});
    }
    return result;
  }
};

TaskManager.init();

export default TaskManager;
