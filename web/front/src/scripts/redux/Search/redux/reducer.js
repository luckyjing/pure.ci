import * as TYPE from './constant'
import {namespace} from '../../../global/services'
import {notification}  from 'antd'
namespace('Search', TYPE);
const initialState = {
  init: true,
  type: '',
  shop: [],
  customer: []
};

// Action Handlers
// 需要编辑
const ACTION_HANDLERS = {
  [TYPE.INIT]: (state)=> {
    return initialState;
  },
  [TYPE.ERROR]: (state, action)=> {
    notification.error({
      message: 'Request Failed',
      description:'The Server is unavailable.Please try again'
    });
    return state;
  },
  [TYPE.SEARCH_SHOP]: (state, action)=> {
    let _state = Object.assign({}, state);
    _state.shop = action.data;
    _state.init = false;
    _state.type = 'shop';
    return _state;
  },
  [TYPE.SEARCH_CUSTOMER]: (state, action)=> {
    let _state = Object.assign({}, state);
    _state.customer = action.data;
    _state.init = false;
    _state.type = 'customer';
    return _state;
  }
};

// Reducer
// 无需编辑
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
