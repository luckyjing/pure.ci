import shell from '../../util/shell';
import path from 'path';
export default {
  key : 'clone',
  taskName : 'Git 仓库克隆',
  desc : '',
  config : {},

  async context(ctx) {
    try {
      const log = await shell('git', [
        'clone', '--branch', ctx.BRANCH, ctx.REPOSITORY_URL, ctx.REPOSITORY_NAME
      ], ctx.TMP_WORKSPACE);
      ctx.log(log);
      ctx.REPOSITORY_WORKSPACE = path.join(ctx.TMP_WORKSPACE, `./${ctx.REPOSITORY_NAME}`)
      this.success();
    } catch (e) {
      this.fail(e);
    }
  }
};