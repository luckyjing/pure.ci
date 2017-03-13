let sleep = ()=> {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve();
    }, 3000)
  });
};
export default {
  key: 'sleep',
  name: '睡觉',
  description: '好好休息',
  config: {
    /* default config */
  },
  async context(){
    console.log(`[${this.config.name}]要睡觉啦`);
    await sleep();
    console.log(`[${this.config.name}]起床啦`);
    this.success();
  }
};