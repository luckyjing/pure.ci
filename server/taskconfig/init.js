import request from 'request'
import Shell from 'shell-task'
import path from 'path'

const workspace = path.resolve(__dirname, '../../workspace');

let init = (projectName)=> {
  return new Promise((resolve, reject)=> {
    new Shell(`cd ${workspace}`)
      .then(`mkdir -p ${projectName}`)
      .then(`cd ${projectName}`)
      .then(`mkdir log && mkdir tmp && mkdir data`)
      .run((err, next)=> {
        if (err) {
          reject();
        } else {
          resolve();
        }
      })
  });
};
export default {
  key: 'init',
  name: '初始化任务',
  description: '分配工作空间',
  // context 里面的this将绑定到Task实例上，可以获取到Task类里的任何成员变量或方法，如this.success,this.fail,this.config
  async context(){
    if (!this.config.projectName) {
      return this.fail();
    }
    try {
      await init(this.config.projectName);
    } catch (e) {
      return this.fail();
    }
    this.success();
  }
};