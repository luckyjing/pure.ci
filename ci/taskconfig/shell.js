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
  name: '执行Shell命令',
  description: '',
  config: {
    /* default config */
  },
  async context(ctx) {
    try {
      await exec(this.config.task);
    }
    catch (e) {
      return this.fail(e);
    }
    this.success();
  }
};