import _ from 'lodash'
import TaskManager from './taskmanager'
import * as yaml from '../util/yaml'
export default class WorkFlow {
  constructor() {
    this.id = _.uniqueId();
    this.stages = [];
  }
  /**
   * 添加一个阶段
   * @param name {string} 阶段名称
   */
  addStage(name) {
    this.stages.push(name);
  }
  /**
   * stage里追加一条作业
   * @param stage {string} 阶段名称
   * @param key {string} 作业类型
   * @param name {string} 作业名称[唯一]
   * @param index {number} 作业在当前阶段的运行次序 
   * @param config {object} 作业运行参数
   */
  addTask(stage, key, name, index, config = {}) {
    this[name] = {
      name: name,
      stage: stage,
      type: key,
      index: index,
      config: config
    }
  }
  /**
   * 修改某条作业
   * @param {string} name 作业名称
   * @param {object} config 修改参数
   */
  changeTask(name, config) {
    this[name] = {
      ...this[name],
      ...config
    }
  }
  async runTask(ctx, taskList) {
    let runChain = taskList.map(task => {
      let detailTask = TaskManager.get(task.type);
      let instance = new detailTask(task.config);
      instance.name = task.name;
      return instance;
    });
    for (let instance of runChain) {
      try {
        await instance.run(ctx);
      } catch (e) {
        throw e;
      } finally {
        this.changeTask(instance.name, {
          status: instance.status
        })
      }
    }
  }
  async run(ctx) {
    // 生成任务链数组，每个数组里是一个async Function
    let stageChain = this.stages.map(stage => {
      let taskList = [];
      for (let key in this) {
        if (this[key].stage == stage) {
          taskList.push(this[key]);
        }
      }
      // 按照次序进行
      taskList.sort((a, b) => {
        return a.index - b.index;
      })
      return async () => {
        ctx.log(`[Start Stage] ${stage} `);
        try {
          await this.runTask(ctx, taskList);
          ctx.log(`[Finish Stage] ${stage} `);
        } catch (e) {
          ctx.log(`[Error Stage] ${stage} `);
          throw e;
        }
      }
    });
    for (let stage of stageChain) {
      try {
        await stage();
      } catch (e) {
        throw e;
      }
    }
  }

  /**
   * 将当前的工作流配置导出为YAML格式
   */
  saveConfig() {
    let output = {};
    for (let key in this) {
      if (['id'].indexOf(key) < 0) {
        output[key] = this[key];
      }
    }
    return yaml.toYaml(output);
  }
  /**
   * 根据YAML文件生成一个workflow
   */
  loadConfig(yamlContent) {
    let jsContent = yaml.toJs(yamlContent);
    jsContent.stages.forEach(stage => {
      this.addStage(stage);
    });
    for (let key in jsContent) {
      if (key != 'stages') {
        let task = jsContent[key];
        this.addTask(task.stage, task.type, key, task.index, task.config);
        // 为当前任务添加描述信息
        let taskSchema = TaskManager.get(task.type);
        this.changeTask(key, {
          taskName: taskSchema.taskName,
          desc: taskSchema.desc
        });
      }
    }
  }
}