import test from 'ava'

import { addTask, getTaskList, addAll } from '../../backend/services/task';

test.only('添加一个任务到数据库里', async t => {
  let result = await addTask('test', '测试任务', '这是任务的描述内容', {
    autoClose: false
  });
  return result;
});
test('添加全部任务到数据库里', async t => {
  await addAll();
})
test('查询所有任务', async t => {
  let res = await getTaskList();
  console.log(res);
});