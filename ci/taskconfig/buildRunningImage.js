import request from 'request'
import path from 'path'
import shell from '../../util/shell';
import {makeImageName} from '../../util/docker';

export default {
  key : 'buildRunningImage',
  taskName : '构建运行型Docker镜像',
  desc : '使用Dockerfile构建镜像',
  config : {},
  async context(ctx) {
    const imageName = makeImageName(ctx.REGISTRY, ctx.PROJECT_ID, ctx.REPOSITORY_NAME);
    ctx.log(`镜像名：${imageName}`);
    ctx.log(`当前工作目录：${ctx.REPOSITORY_WORKSPACE}`);
    try {
      await shell('docker', [
        'build', '-t', `${imageName}`, '.'
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      });
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};