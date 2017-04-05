import request from 'request'
import Shell from 'shell-task'
import path from 'path'

const workspace = path.resolve(__dirname, '../../workspace');

let init = (projectName) => {
  return new Promise((resolve, reject) => {
    resolve('ok');
  });
};
export default {
  key: 'init',
  name: '初始化',
  description: '分配工作空间',
  // context 里面的this将绑定到Task实例上，可以获取到Task类里的任何成员变量或方法，如this.success,this.fail,this.config
  async context(ctx) {
    if (!this.config.projectName) {
      this.fail();
    }
    try {
      await init(this.config.projectName);
      ctx.projectName = this.config.projectName;
      this.success();
    } catch (e) {
      this.fail();
    }
  }
};