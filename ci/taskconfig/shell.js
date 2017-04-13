import Shell from 'shell-task'

let exec = (task) => {
  if (!task) {
    throw new Error('shell 命令 不能为空')
  }
  return new Promise((resolve, reject) => {
    new Shell(task).run((err, next) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
export default {
  key: 'shell',
  taskName: '执行Shell命令',
  desc: '在一个Docker镜像里面执行',
  config: {
    /* default config */
  },
  async context(ctx) {
    try {
      await exec(this.config.script[0]);
    }
    catch (e) {
      return this.fail(e);
    }
    this.success();
  }
};