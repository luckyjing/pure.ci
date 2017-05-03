import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline, Button, Table, Icon } from 'antd';
import Toast from '../../utils/toast';

class Project extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.project
  };
}

export default connect(mapStateToProps)(Project);
