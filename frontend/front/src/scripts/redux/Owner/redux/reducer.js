import * as TYPE from './constant';
import {namespace} from '../../../global/services'
namespace('Owner', TYPE);
const initialState = {
  ownerList:[],
  loading: false
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
  [TYPE.GET_INFO]: (state, action)=> {
    let _state = Object.assign({}, state);
    _state.ownerList = action.data;
    _state.loading= 'false';
    return _state;
  },
  [TYPE.DELETECUS]:(state,action)=>{
    var st=state;
    st.ownerList.splice(action.index,1);
    return Object.assign({},st);
  },
  [TYPE.ADBLCUS]:(state,action)=>{
    var st=state;
    st.ownerList[action.index].state=2;
    return Object.assign({},st);
  }
};

// Reducer
// 无需编辑
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
