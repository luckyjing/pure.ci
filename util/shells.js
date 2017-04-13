import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import uuid from './uuid';
import path from 'path';
/**
 * 执行一段 Shell 脚本
 * @param {string} source 脚本源码
 * @param {array} params 参数数据
 * @param {string} cwd 执行目录
 * @example shell('echo',['hello world'])
 **/
export default async function (shellArray, params, cwd = undefined) {
  // 创建一份临时的脚本文件  
  let filename = uuid();
  let filepath = path.join(__dirname, `./${filename}`);
  fs.writeFileSync(filepath, ['#!/bin/bash', '', ...shellArray].join(os.EOL));
  fs.chmodSync(filepath, '777');
  let shell = spawn(filepath, params, {
    cwd
  });
  /**
   * 不能用 pipe，pipe 会自动关闭 stdout
   * 但是在发生异常时，还会调用 self.console.error
   * pipe 将会出来 Error: write after end
   * shell.stdout.pipe(self.stdout);
   **/
  let log = [];
  return new Promise((resolve, reject) => {
    shell.stdout.on('data', (data) => {
      log.push(data);
    });
    // 命令执行出错时
    shell.stderr.on('data', (data) => {
      log.push(data);
    })
    // 进程命令错误时
    shell.on('error', (err) => {
      log.push(`[出错]${err}`);
    })
    // 进程结束[各种情况都会进入]
    shell.on('close', (code) => {
      log.push(`[结束]状态码：${code}`);
      // 结束后将此临时文件删除
      fs.unlink(filepath);
      if (code == 0) {
        resolve(log.join(''));
      } else {
        reject(log.join(''));
      }
    });
  });
};