import test from 'ava'
import * as file from '../../util/file'
import shells from '../../util/shells'
import path from 'path'


test.skip('shells', async t => {
  let log;
  try {
    log = await shells(['echo $PWD'], [], {
      cwd: path.join(__dirname, '../tmp')
    });
  } catch (errLog) {
    log = errLog;
  }
  console.log(log);
});