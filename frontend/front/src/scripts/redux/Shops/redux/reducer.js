import * as TYPE from './constant';
import {namespace} from '../../../global/services'
namespace('Shops', TYPE);
const initialState = {
  loading: false,
  shopList:[],
  shopRequestList:[],
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
    _state.shopList = action.data;
    _state.loading= false;
    return _state;
  },
  [TYPE.GET_REQUEST]:(state, action)=> {
    let _state=Object.assign({},state);
    _state.shopRequestList=action.data;
    _state.loading=false;
    return _state;
  },
  [TYPE.DELETESH]:(state,action)=>{
    var st=state;
    st.shopList.splice(action.index,1);
    return Object.assign({},st);
  },
  // [TYPE.ADBLSH]:(state,action)=>{
  //   var st=state;
  //   if(st.shopList[action.index].code=1){
  //     return Object.assign({},st);
  //   }
  // },
  [TYPE.DELETESHREQ]:(state,action)=>{
    var st=state;
    st.shopRequestList.splice(action.index,1);
    return Object.assign({},st);
  }
};

// Reducer
// 无需编辑
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
