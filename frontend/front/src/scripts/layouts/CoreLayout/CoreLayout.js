import React from 'react'
import * as actions from '../../global/action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import DefaultContainer from './layout/default'
import LoginLayout from './layout/login'
export const CoreLayout = (props) => {
  let {NOW_LOCATION} =props;
  let Container = DefaultContainer;
  if (NOW_LOCATION.indexOf('/login') >= 0) {
    // 登录页 用不同的布局
    Container = LoginLayout;
  }
  return (
    <Container {...props}/>
  );

};

// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(actions, dispatch)
});

// 将state绑定到props上
const mapStateToProps = (state) => ({
  router: state.router,
  NOW_LOCATION: state.global.NOW_LOCATION
});

// 导出链接好的React Class
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
