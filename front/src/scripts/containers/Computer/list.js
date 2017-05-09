import React, {Component} from 'react';
import {Button, Row, Col, Table} from 'antd';

class List extends Component {
  render() {
    const columns = [
      {
        title: '序号',
        render: (text, record) => {
          return <span>{record.id}</span>
        }
      }, {
        title: '主机地址',
        render: (text, record) => (
          <span>{record.hostname}</span>
        )
      }, {
        title: '操作',
        render: (text, record) => (
          <a
            onClick={(e) => {
            e.preventDefault();
            this
              .props
              .setPC(record.hostname, record.port);
          }}>查看主机状态</a>
        )
      }
    ]
    return (
      <div>
        <Table
          rowKey='id'
          pagination={false}
          columns={columns}
          dataSource={this.props.state.list}/>
      </div>
    );
  }
}

export default List;