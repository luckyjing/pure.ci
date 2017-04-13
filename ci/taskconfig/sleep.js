let sleep = (duration)=> {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve();
    }, duration)
  });
};
export default {
  key: 'sleep',
  taskName: '休眠',
  desc: '好好休息',
  config: {
    /* default config */
    duration:1000
  },
  async context(){
    await sleep(this.config.duration);
    console.log(`已休眠 ${this.config.duration} ms`);
    this.success();
  }
};