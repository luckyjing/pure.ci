import * as TYPE from './constant';
import {namespace} from '../../../global/services'
import $ from 'jquery-ajax'
namespace('Ad', TYPE);

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
    type: TYPE.GET_SHOP,
    data: res
  }
}

export function receiveInfo2(res) {
  return {
    type: TYPE.GET_GOOD,
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
      url:"/administrator/ajax/adApplication_getShopAdApplication.json",
      data:{

      },
      dataType:'json'
    }).done(res=>{
      dispatch(receiveInfo(res.data));
      callback();
    });
  }
}

export function getInfo4(callback) {
  return (dispatch, getState) => {
    // 在这儿使用dispath可以实现在异步请求前做一次操作
    return $.ajax({
      url:"/administrator/ajax/adApplication_getProAdApplication.json",
      data:{

      },
      dataType:'json'
    }).done(res=>{
      dispatch(receiveInfo2(res.data));
      callback();
    });
  }
}

export function deleteAdSh(index) {
  return {
    type:TYPE.DELETEAD,
    index
  }
}

export function getInfo2(adApplicationId,state,index) {
  return (dispatch,getState)=>{
    return $.ajax({
      url:"/administrator/ajax/adApplication_applyAd.json",
      data:{
        adApplicationId,
        state
      },
      dataType:'json'
    }).done(res=>{
      if (res.code!=200){
        alert("Advertising is full!");
      }
      else if (res.code==200){
        dispatch(deleteAdSh(index))
      }
    })
  }
}

export function deleteAd(index){
  return {
    type:TYPE.DELETE,
    index
  }
}

export function getInfo3(adApplicationId,state,index) {
  return (dispatch,getState)=>{
    return $.ajax({
      url:"/administrator/ajax/adApplication_getProAdApplication.json",
      data:{
        adApplicationId,
        state
      },
      dataType:'json'
    }).done(res=>{
      if (res.code!=200){
          alert("Advertising is full!");
      }
      else if(res.code==200){
        dispatch(deleteAd(index));
      }
    })
  }
}


