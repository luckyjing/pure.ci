/**
 * Created by sujingxin on 2017/1/21.
 */
import test from 'ava'

import TaskManager from '../../ci/taskmanager'
import Job from '../../ci/job'
import WorkFlow from '../../ci/workflow'

test('TaskManager list', t => {
  t.truthy(TaskManager.list())
});
test('TaskManager get', async t => {
  let Task = TaskManager.get('init');
  t.is(Task.key, 'init');
});
// 抽取一个任务，然后执行它
test.skip('Task # run a task', async t => {
  let Task = TaskManager.get('init');
  let task = new Task();
  let result = await task.run();
  t.is(result, 'LuckyJing');
});

// 能够捕获到任务执行时的状态变化
test('Task # getStatus', async t => {
  let Task = TaskManager.get('init');
  let task = new Task();
  console.log(task.getStatus());
  setInterval(() => {
    console.log(task.getStatus());
  }, 1000);
  await task.run();
  console.log(task.getStatus());
});


test.only('Job # run', async t => {
  let workflow = new WorkFlow();
  workflow.add('init', 1, { projectName: 'luckyjing/demo' });
  workflow.add('shell', 2, { task: 'echo LuckyJing' });
  // workflow.add('shell', 3, { task: 'docker pull nginx' });
  workflow.add('sleep', 4, { name: 'Monkey',duration:1000 });
  let job = new Job(workflow);
  await job.run();
});