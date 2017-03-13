import * as TYPE from './constant'
import {namespace} from '../../../global/services'
import $ from 'jquery-ajax'
namespace('Search', TYPE);
export function init() {
  return {
    type: TYPE.INIT
  }
}
export function error() {
  return {
    type: TYPE.ERROR
  }
}
export function receiveShop(list) {
  return {
    type: TYPE.SEARCH_SHOP,
    data: list
  }
}
export function searchShop(text) {
  return (dispatch, getState) => {
    dispatch(init());
    return $.ajax({
      url: "/administrator/ajax/searchShop.json",
      data: {
        text
      },
      dataType: 'json'
    }).done(res=> {
      if (res.code == 200) {
        dispatch(receiveShop(res.data));
      } else {
        dispatch(error(res));
      }
    });
  }
}
export function receiveCustomer(list) {
  return {
    type: TYPE.SEARCH_CUSTOMER,
    data: list
  }
}
export function searchCustomer(text) {
  return (dispatch, getState) => {
    dispatch(init());
    return $.ajax({
      url: "/administrator/ajax/searchCustomer.json",
      data: {
        text
      },
      dataType: 'json'
    }).done(res=> {
      if (res.code == 200) {
        dispatch(receiveCustomer(res.data));
      } else {
        dispatch(error(res));
      }
    });
  }
}
