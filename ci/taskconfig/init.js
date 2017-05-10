import request from 'request'
import path from 'path'
import shell from '../../util/shell';
export default {
  key : 'init',
  taskName : '初始化任务',
  desc : '分配工作空间，配置全局变量',
  config : {},
  async context(ctx) {

    try {
      // 清空tmp目录
      ctx.log('开始创建临时工作目录...');
      await shell('rm', [
        '-rf', 'tmp'
      ], ctx.WORKSPACE);
      await shell('mkdir', ['tmp'], ctx.WORKSPACE);
      ctx.log('创建成功');
      ctx.TMP_WORKSPACE = path.join(ctx.WORKSPACE, './tmp');
      // 显示配置信息
      ctx.log('===============环境变量=======================');
      ctx.log(`PROJECT_ID(项目id) : ${ctx.PROJECT_ID}`);
      ctx.log(`JOB_ID(作业id) : ${ctx.JOB_ID}`);
      ctx.log(`REPOSITORY_NAME(关联仓库名) : ${ctx.REPOSITORY_NAME}`);
      ctx.log(`REPOSITORY_URL(关联仓库url) : ${ctx.REPOSITORY_URL}`);
      ctx.log(`BRANCH(代码执行分支) : ${ctx.BRANCH}`);
      ctx.log(`REGISTRY(Docker镜像仓库地址) : ${ctx.REGISTRY}`);
      // ctx.log(`WORKSPACE : ${ctx.WORKSPACE}`);
      // ctx.log(`TMP_WORKSPACE : ${ctx.TMP_WORKSPACE}`);
      ctx.log('==================================================');
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};