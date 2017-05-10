import React, {Component} from 'react';
import {Steps, Timeline, Spin, Icon} from 'antd';
import yaml from 'js-yaml';
import deepmerge from 'deepmerge';
const Step = Steps.Step;

const statusColorMap = {
  '-1': 'red',
  '0': '#ccc',
  '1': 'blue',
  '2': 'green'
}
const style = {
  marginTop: '12'
}
class TimeLine extends Component {
  makeDetailStage = (tasks) => {

    return (
      <Timeline style={style}>
        {tasks.map((item, index) => {
          const props = {}
          if (item.status == 1) {
            props.dot = <Icon type="loading" style={{}}/>;
          }
          return <Timeline.Item key={index} {...props} color={statusColorMap[item.status]}>{item.taskName || item.type}</Timeline.Item>
        })}
      </Timeline>
    );
  }
  getRelatedTask = (workflow, stage) => {
    let tasks = [];
    // 添加所有任务
    for (let key in workflow) {
      if (key != 'stages' && workflow[key].stage == stage) {
        tasks.push(workflow[key]);
      }
    }
    tasks.sort((a, b) => a.index - b.index);
    return tasks;
  }
  getStatus = (tasks) => {
    let status = 'wait';
    if (tasks[0].status != 0) {
      status = 'process'
    }
    if (tasks[tasks.length - 1].status == 2) {
      status = 'finish'
    }
    tasks.forEach(item => {
      if (item.status == -1) {
        status = 'error'
      }
    });
    return status;
  }
  renderWorkFlow = (text, runningStatus) => {
    let workflow = yaml.safeLoad(text);
    if (!workflow) {
      return undefined;
    }
    if (runningStatus) {
      workflow = deepmerge(workflow, runningStatus);
    }
    let parseWorkFlow = {};
    parseWorkFlow.stages = workflow
      .stages
      .map(stage => {
        const tasks = this.getRelatedTask(workflow, stage);
        return {
          name: stage,
          status: this.getStatus(tasks),
          tasks: tasks,
          description: this.makeDetailStage(tasks)
        }
      });
    return parseWorkFlow;
  }
  render() {
    const workflow = this.renderWorkFlow(this.props.workflow, this.props.runningStatus);
    return (
      <div>
        {workflow
          ? <Steps >
              {workflow
                .stages
                .map((item, index) => {
                  return (< Step key = {
                    index
                  }
                  title = {
                    item.name
                  }
                  status = {
                    item.status
                  }
                  description = {
                    item.description
                  } />)
                })}
            </Steps>
          : ''}

      </div>
    );
  }
}

export default TimeLine;