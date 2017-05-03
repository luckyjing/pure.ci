import React, {Component} from 'react';
import {connect} from 'dva';
import {Timeline, Button, Table, Icon} from 'antd';
import Toast from '../../utils/toast';

class DashBoard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="material-card"></div>
    );
  }
}

function mapStateToProps(state) {
  return {state: state.dashboard};
}

export default connect(mapStateToProps)(DashBoard);
