import * as TYPE from './constant';
import {namespace} from './services'
namespace('global', TYPE);
const initState = {
  _system_menu: [],
  NOW_LOCATION: ''
};
const ACTION_HANDLERS = {
  [TYPE.NOW_LOCATION]: (state, action)=> {
    return Object.assign({}, state, {
      NOW_LOCATION: action.data
    });
  }
};
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
