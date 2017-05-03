import request from 'request'
import path from 'path'
import shell from '../../util/shell';

export default {
  key : 'clean',
  taskName : '收尾任务',
  desc : '清除临时空间',
  config : {},
  async context(ctx) {

    try {
      // 清空tmp目录
      ctx.log('开始清除临时工作目录...');
      await shell('rm', [
        '-rf', 'tmp'
      ], ctx.WORKSPACE);
      ctx.log('清除完成');
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};