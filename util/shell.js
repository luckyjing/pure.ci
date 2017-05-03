import {spawn} from 'child_process';
import os from 'os';
/**
 * 执行一段 Shell 脚本
 * @param {string} source 脚本源码
 * @param {array} params 参数数据
 * @param {string} cwd 执行目录
 * @example shell('echo',['hello world'])
 **/
export default async function (source, params, cwd = undefined, logFunction) {
  console.log(source, params, cwd);
  if (!logFunction) {
    logFunction = () => {}
  }
  let shell = spawn(source, params, {cwd, stdio: 'pipe'});
  /**
   * 不能用 pipe，pipe 会自动关闭 stdout
   * 但是在发生异常时，还会调用 self.console.error
   * pipe 将会出来 Error: write after end
   * shell.stdout.pipe(self.stdout);
   **/

  let log = [];
  const shellInfo = `> ${source} ${params.join(' ')}`;
  logFunction(shellInfo);
  log.push(shellInfo);

  return new Promise((resolve, reject) => {
    shell
      .stdout
      .on('data', (data) => {
        logFunction(data);
        log.push(data);
      });
    // 命令执行出错时
    shell
      .stderr
      .on('data', (data) => {
        logFunction(data);
        log.push(data);
      })
    // 进程命令错误时
    shell.on('error', (err) => {
      logFunction(`[脚本执行出错]${err}`);
      log.push(`[脚本执行出错]${err}`);
    })
    // 进程结束[各种情况都会进入]
    shell.on('close', (code) => {
      if (code == 0) {
        resolve(log.join(os.EOL));
      } else {
        reject(log.join(os.EOL));
      }
    });
  });
};