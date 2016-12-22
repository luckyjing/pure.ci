import * as TYPE from './constant'
import {namespace} from './services'
namespace('global', TYPE);
export function nowLocation(data) {
  return {
    type: TYPE.NOW_LOCATION,
    data
  }
}
