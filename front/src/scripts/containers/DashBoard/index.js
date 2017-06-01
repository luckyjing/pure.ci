import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Timeline,
  Button,
  Icon,
  Table,
  Row,
  Col
} from 'antd';
import Toast from '../../utils/toast';

class DashBoard extends Component {
  constructor() {
    super();
  }
  render() {
    const cols = [
      {
        title: '标志词',
        dataIndex: 'key',
        key: 'key'
      }, {
        title: '任务名',
        dataIndex: 'taskName',
        key: 'taskName'
      }, {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc'
      }
    ]
    return (
      <div className="material-card">
        <Row>
          <Col>
          <h2>系统支持的任务列表</h2>
          </Col>
        </Row>
        <Table
          bordered={true}
          dataSource={this.props.state.task}
          columns={cols}
          pagination={false}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {state: state.dashboard};
}

export default connect(mapStateToProps)(DashBoard);
