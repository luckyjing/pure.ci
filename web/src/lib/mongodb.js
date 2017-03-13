/**
 * Created by sujingxin on 2016/12/22.
 * 完成数据库的连接及Schema绑定
 */
import mongoose from 'mongoose';
import config from '../config/config';
import log4js from 'log4js';

const LOG = log4js.getLogger('file');

// 注册模型
import '../models/account'
export default  ()=> {
  mongoose.connect(config.mongodb.host);
  let db = mongoose.connection;
  db.on('error', ()=> {
    LOG.error('mongodb connected failed');
  });
  db.once('open', function () {
    LOG.info('mongodb connect successful');
  });

}