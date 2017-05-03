import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

class Container extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // 使用dispatch发起action
  }

  render() {
    return (
      <div>
        <Button>
          BaseInfo
        </Button>
      </div>
    );
  }
}

// 链接组件，这一步注入了this.props.dispatch
export default Container;