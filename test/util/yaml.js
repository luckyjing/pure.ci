import test from 'ava'
import * as file from '../../util/file'
import * as yaml from '../../util/yaml'
import path from 'path'

test('读取yaml文件', async t => {
  let text = await file.read(path.join(__dirname, '../tmp/test.yml'));
  let content = yaml.toJs(text);
  let parseYaml = yaml.toYaml(content);
  file.save(path.join(__dirname, '../tmp/test-1.yml'), parseYaml);
  text = await file.read(path.join(__dirname, '../tmp/test-1.yml'));
  t.deepEqual(content, yaml.toJs(text));
});