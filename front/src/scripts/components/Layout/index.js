import React, {Component} from 'react';
import {connect} from 'dva';
import './index.less';
import SideBar from '../SideBar/index';
import TopBar from '../TopBar/index';

class AppLayout extends Component {
  componentDidMount() {
    this
      .props
      .dispatch({type: 'user/fetchUserInfo'})
  }

  render() {
    return (
      <div className='app-container'>
        <SideBar dispatch={this.props.dispatch} state={this.props.state}/>
        <div className="main-content">
          <TopBar
            dispatch={this.props.dispatch}
            layout={this.props.layout}
            userState={this.props.userState}/>
          <div className={`layout-content`}>
            {this.props.children}
          </div>
        </div>

      </div>

    );

  }
}

function mapStatetoProps(state) {
  return {userState: state.user, layout: state.layout}
}

// 链接组件，这一步注入了this.props.dispatch
export default connect(mapStatetoProps)(AppLayout);