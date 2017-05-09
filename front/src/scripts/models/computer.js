import * as homeServices from '../services/home';
import {hashHistory, routerRedux} from 'dva/router';

export default {

  namespace : 'computer',

  state : {
    list: [
      {
        id: '123',
        hostname: 'localhost',
        port: 3000
      }
    ]
  },

  subscriptions : {
    setup({dispatch, history}) { // eslint-disable-line
    }
  },

  effects : {},

  reducers : {}
};
