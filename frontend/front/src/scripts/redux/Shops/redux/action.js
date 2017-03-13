import * as TYPE from './constant';
import {namespace} from '../../../global/services'
import $ from 'jquery-ajax'
namespace('Shops', TYPE);

export function demo(msg) {
  return {
    type: TYPE.DEMO,
    data: msg
  }
}
/**
 * 在发起异步Ajax请求前,可以触发一次loading action,此时可以根据loading的状态在页面里展示加载提示
 * @returns {{type}}
 */
export function loading() {
  return {
    type: TYPE.LOADING
  }
}
/**
 * 异步请求结束后触发的action
 * @param res {JSON Object} - Ajax请求拿到的JSON对象(已经序列化,可以直接使用)
 * @returns {{type, data: *}}
 */
export function receiveInfo(res) {
  return {
    type: TYPE.GET_INFO,
    data: res
  }
}

 export function receiveInfo3(res) {
   return {
    type: TYPE.GET_REQUEST,
    data: res
   }
 }
/**
 * 异步请求的action,在发送请求前打开loading,在发送请求后由后续的action去关闭loading
 * @returns {Promise}
 */
export function getInfo(callback) {
  return (dispatch, getState) => {
    // 在这儿使用dispath可以实现在异步请求前做一次操作
    dispatch(loading());
    return $.ajax({
      url:"/administrator/ajax/shopList.json",
      data:{
      },
      dataType:'json'
    }).done(res=>{
      dispatch(receiveInfo(res.data));
      callback();
    });
  }
}

export function deleteShReq(index) {
  return {
    type:TYPE.DELETESHREQ,
    index
  }
}

export function getInfo2(applicationId,state,index) {
  return (dispatch,getState)=>{
    return $.ajax({
      url:"/administrator/ajax/shopApplication_handleApplication.json",
      data:{
        applicationId,
        state
      },
      dataType:'json'
    }).done(res=>{
      if (res.code==200){
        dispatch(deleteShReq(index))
      }
    })
  }
}

export function getInfo3(callback) {
  return (dispatch, getState) => {
    // 在这儿使用dispath可以实现在异步请求前做一次操作
    return $.ajax({
      url:"/administrator/ajax/shopApplication_getApplicationList.json",
      data:{

      },
      dataType:'json'
    }).done(res=>{
      dispatch(receiveInfo3(res.data));
      callback();
    });
  }
}

export function deleteSho(index) {
  return {
    type:TYPE.DELETESH,
    index
  }
}

export function deleteSh(shopId,index) {
  return (dispatch, getState) => {
    // 在这儿使用dispath可以实现在异步请求前做一次操作
    return $.ajax({
      url:"/administrator/ajax/shop_deleteShop.json",
      data:{
        shopId
      },
      dataType:'json'
    }).done(res=>{
      if (res.code==200){
        alert("The Shop has been deleted!");
        dispatch(deleteSho(index));
      }
    });
  }
}

// export function adBLSh(index) {
//   return{
//     type:TYPE.ADBLSH,
//     index
//   }
// }
//
// export function addBlackSh(userId,index) {
//   return (dispatch, getState) => {
//     // 在这儿使用dispath可以实现在异步请求前做一次操作
//     return $.ajax({
//       url:"/administrator/ajax/user_blackOwner.json",
//       data:{
//         userId
//       },
//       dataType:'json'
//     }).done(res=>{
//       if (res.code==200){
//         alert("The Shop Has Been Add to The Black List!");
//         dispatch(adBLSh(index));
//       }
//     });
//   }
// }
//
