/**
 * Created by sujingxin on 2017/1/21.
 */
import test from 'ava'

import TaskManager from '../../ci/taskmanager'
import Job from '../../ci/job'
import WorkFlow from '../../ci/workflow'
import * as file from '../../util/file'
import path from 'path'


test.skip('Job # 根据一份yml文件运行项目', async t => {
  let workspace = path.join(__dirname, '../../workspace/1/我的持续集成项目');
  let workflowContent = await file.read(path.join(__dirname, '../tmp/flow.yml'));
  let job = new Job(workspace, workflowContent);
  await job.run();
  let parse = job.flow.saveConfig();
  await file.save(path.join(__dirname, '../tmp/_save_flow.yml'), parse);
});