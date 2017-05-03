import request from 'request'
import path from 'path'
import shell from '../../util/shell';

export default {
  key : 'buildRunningImage',
  taskName : '构建运行型Docker镜像',
  desc : '使用Dockerfile构建镜像',
  config : {},
  async context(ctx) {
    let namespace = ctx
      .PROJECT_ID
      .replace('-', '');
    namespace = namespace.replace('_', '');
    namespace = namespace.toLowerCase();
    ctx.log(`镜像名：${namespace}/${ctx.REPOSITORY_NAME}`);
    ctx.log(`当前工作目录：${ctx.REPOSITORY_WORKSPACE}`);
    try {
      await shell('docker', [
        'build', '-t', `${namespace}/${ctx.REPOSITORY_NAME}`, '.'
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      });
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};