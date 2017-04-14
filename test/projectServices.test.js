import test from 'ava';
import ProjectServices from '../backend/services/projectServices';
import * as file from '../util/file';
import path from 'path';
import uuid from '../util/uuid';

test.only('projectServices # initProject', async t => {
  let project_id = await ProjectServices.initProject('1', '我的持续集成项目', 'http://coding.net/abc', 'pure-ci');
  await ProjectServices.start('1', project_id, 'fix', 'feature');
  // await ProjectServices.start('1', 'H1zBER2pl', 'fix other', 'feature');
});
