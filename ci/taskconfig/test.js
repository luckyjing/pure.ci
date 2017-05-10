import request from 'request'
import path from 'path'
import shell from '../../util/shell';
export default {
  key : 'test',
  taskName : '测试',
  desc : '选择一个Dockerfile用来测试',
  config : {},
  async context(ctx) {
    console.log(this.config.dockerfile);
    ctx.log(`当前工作目录：${ctx.REPOSITORY_WORKSPACE}`);
    try {
      if (!this.config.dockerfile) {
        throw new Error('dockerfile参数不能为空');
      }
      const testImageName = `test/${ctx.REPOSITORY_NAME}`;
      await shell('docker', [
        'build',
        '-t',
        testImageName,
        '-f',
        `${this.config.dockerfile}`,
        '.'
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      });
      await shell('docker', [
        'run', '--rm', '-i', testImageName
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      });
      await shell('docker', [
        'rmi', testImageName
      ], ctx.REPOSITORY_WORKSPACE, (log) => {
        ctx.log(log);
      })
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};