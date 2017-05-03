import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Row, Col, Table} from 'antd';
import {fromNow} from '../../../utils/base'

const columns = [
  {
    title: '序号',
    render: (text, record) => {
      return <span>{text.index + 1}</span>
    }
  }, {
    title: '项目名称',
    render: (text, record) => (
      <a href={`#/project/${text.id}`}>{record.name}</a>
    )
  }, {
    title: '代码仓库',
    render: (text, record) => (
      <a href={record.repository_url}>{record.repository_name}</a>
    )
  }
]

class Container extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'layout/pageName', payload: '项目列表'});
    dispatch({type: 'project/projectList'});
  }


  toCreate() {
    location.hash = '#/project/create';
  }
  render() {
    const {state} = this.props;
    return (
      <div>
        <div className="material-card">
          <Row type="flex" justify="end">
            <Col span={2}>
              <Button type="primary" onClick={this.toCreate}>
                创建新项目
              </Button>
            </Col>
          </Row>
          <Table
            rowKey='id'
            pagination={false}
            columns={columns}
            dataSource={state.list}/>
        </div>

      </div>

    );
  }
}

function mapStatetoProps(state) {
  return {state: state.project}
}

export default connect(mapStatetoProps)(Container);