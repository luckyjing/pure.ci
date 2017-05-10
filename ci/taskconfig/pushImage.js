import request from 'request'
import path from 'path'
import shell from '../../util/shell';
import {makeImageName} from '../../util/docker';

export default {
  key : 'pushImage',
  taskName : '推送镜像',
  desc : '推送镜像至镜像仓库',
  config : {},
  async context(ctx) {
    const imageName = makeImageName(ctx.REGISTRY, ctx.PROJECT_ID, ctx.REPOSITORY_NAME);
    ctx.log(`当前工作目录：${ctx.REPOSITORY_WORKSPACE}`);
    ctx.log(`准备推送的镜像名：${imageName}`);
    try {
      await shell('docker', [
        'tag', `${imageName}`, `${imageName}`
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      });
      await shell('docker', [
        'push', `${imageName}`
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      })
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};