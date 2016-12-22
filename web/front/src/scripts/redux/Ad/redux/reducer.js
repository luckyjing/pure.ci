import * as TYPE from './constant';
import {namespace} from '../../../global/services'
namespace('Ad', TYPE);
const initialState = {
  loading: false,
  adShopList:[],
  adGoodList:[]
};

// Action Handlers
// 需要编辑
const ACTION_HANDLERS = {
  [TYPE.DEMO]: (state, action) => {
    return state;
  },
  [TYPE.LOADING]: (state, action)=> {
    return Object.assign({}, state, {
      loading: true
    });
  },
  [TYPE.GET_SHOP]: (state, action)=> {
    let _state = Object.assign({}, state);
    _state.adShopList = action.data;
    _state.loading= 'false';
    return _state;
  },

  [TYPE.GET_GOOD]: (state,action)=>{
    let _state = Object.assign({}, state);
    _state.adGoodList = action.data;
    _state.loading= 'false';
    return _state;
  },
  [TYPE.DELETE]:(state,action)=>{
    var st=state;
    st.adGoodList.splice(action.index,1);
    return Object.assign({},st);
  },
  [TYPE.DELETEAD]:(state,action)=>{
    var st=state;
    st.adShopList.splice(action.index,1);
    return Object.assign({},st);
  }
};

// Reducer
// 无需编辑
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
