import * as homeServices from '../services/home';
import { hashHistory, routerRedux } from 'dva/router';

export default {

  namespace: 'dashboard',

  state: {
    user: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },


  effects: {
    *fetchUserList({ payload }, { call, put }) {  // eslint-disable-line
      try {
        let response = yield call(homeServices.fetchUserList);
        yield put({ type: 'user', data: response.data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  reducers: {
    save(state, { payload: { data: data, total } }) {
      return { ...state, data, total };
    },
    user(state, { data }) {
      return {
        ...state,
        user: [...data]
      }
    },
    addUser(state, { data }) {
      return {
        ...state,
        user: [...state.user, {
          ...data,
          id: state.user.length + 1
        }]
      }
    },
    removeUser(state, { id }) {
      return {
        ...state,
        user: state.user.filter(user => user.id != id)
      }
    }
  },

};
