import os from 'os';

export default class DockerDriver {
  constructor() {
    this.commands = [];
  }
  /**
   * 设置基础镜像
   * @param {string} image 镜像名
   * @param {string} tag 标签名
   */
  image(image, tag) {
    let command = `FROM ${image}`;
    if (tag) {
      command = command + `:${tag}`;
    }
    this.commands.push(command);
    return command;
  }
  /**
   * 设置环境变量 
   * @param {*} key 环境变量名
   * @param {*} value 环境变量值
   */
  env(key, value) {
    let command = `ENV ${key} ${value}`;
    this.commands.push(command);
    return command;
  }
  /**
   * 设置卷
   * @param {*} volume 卷的地址
   */
  volume(volume) {
    let command = `VOLUME ["${volume}"]`;
    this.commands.push(command);
    return command;
  }
  /**
   * 执行shell命令
   */
  run(cmd) {
    let command = `RUN ${cmd}`;
    this.commands.push(command);
    return command;
  }
  /**
   * 启动时执行的命令
   * @example cmd('sh','.start.sh');
   * @param {*} args 
   */
  cmd(...args) {
    let shell = args.map(item => {
      return `"${item}"`
    });
    let command = `CMD [${shell.join(",")}]`;
    this.commands.push(command);
    return command;
  }
  /**
   * 导出Dockerfile
   * @returns {string} Dockerfile
   */
  render() {
    return this.commands.join(os.EOL);
  }
}