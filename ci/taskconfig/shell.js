import Shell from 'shell-task'
import shell from '../../util/shell';

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
  key : 'shell',
  taskName : '执行Shell命令',
  desc : '在一个Docker镜像里面执行',
  config : {
    /* default config */
  },
  async context(ctx) {
    let script = this
      .config
      .script
      .trim();
    let source = script
      .split(' ')
      .shift();
    let params = script
      .split(' ')
      .slice(1);
    try {
      const log = await shell(source, params, ctx.WORKSPACE);
      ctx.log(log);
    } catch (e) {
      return this.fail(e);
    }
    this.success();
  }
};