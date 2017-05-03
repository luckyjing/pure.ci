import * as homeServices from '../services/home';
import {hashHistory, routerRedux} from 'dva/router';

export default {

  namespace : 'layout',

  state : {
    /**当前页面名称 */
    pageName: ''
  },

  subscriptions : {
    setup({dispatch, history}) { // eslint-disable-line
    }
  },

  effects : {},

  reducers : {
    pageName(state, {payload}) {
      return {
        ...state,
        pageName: payload
      };
    }
  }
};
