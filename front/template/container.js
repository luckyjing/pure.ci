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
          Container
        </Button>
      </div>
    );
  }
}

// 从Redux里的state取出某一项注入到组件里去，可通过this.props.state访问

function mapStatetoProps(state) {
  return {
    state: state.example
  }
}

// 链接组件，这一步注入了this.props.dispatch
export default connect(mapStatetoProps)(Container);