import * as userServices from '../services/user';
import { hashHistory, routerRedux } from 'dva/router';

export default {
  namespace: 'user',
  state: {
    id: '',
    nickname: '',
    email: '',
    logo: '',
    client_id: '',
    redirect_uri: '',
    coding: null
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetchUserInfo({ payload }, { call, put }) {  // eslint-disable-line
      try {
        let response = yield call(userServices.getUser);
        yield put({ type: 'userinfo', data: response.data });
      } catch (error) {

      }
    }
  },

  reducers: {
    save(state, { payload: { data: data, total } }) {
      return { ...state, data, total };
    },
    userinfo(state, { data }) {
      return {
        ...state,
        ...data
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
