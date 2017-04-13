import test from 'ava';
import dockerDriver from '../util/dockerDriver';
import * as file from '../util/file';
import path from 'path';

let dirver = new dockerDriver();
test.beforeEach(t => {
  t.context.dirver = dirver;
});

test('dockerDriver # image', t => {
  let cmd = t.context.dirver.image('ubuntu', '16:04');
  t.is(cmd, 'FROM ubuntu:16:04');
});

test('dockerDriver # env', t => {
  let cmd = t.context.dirver.env('NODE_ENV', 'production');
  t.is(cmd, 'ENV NODE_ENV production');
});

test('dockerDriver # volume', t => {
  let cmd = t.context.dirver.volume('/project');
  t.is(cmd, 'VOLUME ["/project"]');
});

test('dockerDriver # run', t => {
  let cmd = t.context.dirver.run('chmod +x /project.sh');
  t.is(cmd, 'RUN chmod +x /project.sh');
});

test('dockerDriver # cmd', t => {
  let cmd = t.context.dirver.cmd('sh', '.start.sh');
  t.is(cmd, 'CMD ["sh",".start.sh"]');
});
test('dockerDriver # render', t => {
  let dockerFile = t.context.dirver.render();
  file.save(path.join(__dirname, './tmp/Dockerfile'), dockerFile);
});