/**
 * Created by sujingxin on 2017/1/21.
 */
import test from 'ava'

import TaskManager from '../../web/src/ci/taskmanager'
import Job from '../../web/src/ci/job'
import WorkFlow from '../../web/src/ci/workflow'

test('TaskManager list', t => {
  t.truthy(TaskManager.list())
});
test('TaskManager get', async t => {
  let Task = TaskManager.get('init');
  t.is(Task.key, 'init');
});
// 抽取一个任务，然后执行它
test.skip('Task # run a task', async t => {
  let InitTask = TaskManager.get('init');
  let task = new InitTask({
    projectName: '测试文件夹'
  });
  let result = await task.run();
});

// 能够捕获到任务执行时的状态变化
test.skip('Task # getStatus', async t => {
  let InitTask = TaskManager.get('init');
  let task = new InitTask({
    projectName: 'hello-world'
  });
  console.log(task.getStatus());
  setInterval(() => {
    console.log(task.getStatus());
  }, 500);
  try {
    await task.run();
    console.log(task.getStatus());
  } catch (e) {
    console.log(e);
  }
});


test.only('Job # run', async t => {
  let workflow = new WorkFlow();
  // workflow.push('init', { projectName: 'luckyjing-demo' });
  workflow.push('shell', { task: 'echo LuckyJing' });
  workflow.push('sleep', { name: '易君' });
  workflow.push('sleep', { name: '靖鑫' });
  // workflow.push('shell', { task: 'docker pull nginx' });
  // workflow.push('sleep', { name: 'Monkey' });
  let job = new Job(workflow);
  await job.run();
});