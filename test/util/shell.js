import test from 'ava'
import * as file from '../../util/file'
import shell from '../../util/shell'
import path from 'path'

test('shell 1', async t => {
  shell('docker', ['ps', '-a']);
});

test('shell', async t => {
  let log;
  try {
    log = await shell('git', ['-a']);
  } catch (errLog) {
    log = errLog;
  }
  await file.save(path.join(__dirname, '../tmp/shell.log'), log);
});