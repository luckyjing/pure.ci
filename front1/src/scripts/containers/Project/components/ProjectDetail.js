import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Menu,
  Select,
  Button,
  Spin
} from 'antd';
import * as myComponents from './detail/index';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const Option = Select.Option;
const route = [
  {
    key: 'List',
    text: '执行记录'
  }, {
    key: 'WorkFlow',
    text: '流程定义'
  }, {
    key: 'Setting',
    text: '设置'
  }
]

class ProjectDetail extends Component {
  constructor() {
    super();
    this.state = {
      selectKey: route[0].key
    }
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'layout/pageName', payload: '项目详情'})
    dispatch({
      type: 'project/projectDetail',
      payload: {
        id: this.props.params.id
      }
    })
  }
  showJobDetail = (id) => {
    this.setState({selectKey: 'JobDetail', selectJobId: id})
  }
  closeJobDetail = () => {
    this.setState({selectKey: route[0].key});
  }
  handleClick = (item) => {
    let key = item.key;
    this.setState({selectKey: key})
  }
  handleChangeBranch = (branch) => {
    this.setState({selectBranch: branch});
  }
  handleStartJob = () => {
    const {projectDetail} = this.props.project;
    this
      .props
      .dispatch({
        type: 'project/startJob',
        payload: {
          project_id: this.props.params.id,
          project_name: projectDetail.repository_name,
          branch: this.state.selectBranch,
          commit_msg: projectDetail
            .branches
            .filter(i => i.name == this.state.selectBranch)[0]
            .last_commit
            .shortMessage,
          workflow: projectDetail.workflow
        }
      })
  }
  fetchJobList = () => {
    this
      .props
      .dispatch({
        type: 'project/jobList',
        payload: {
          id: this.props.params.id
        }
      })
  }
  render() {
    // 获取项目详情
    const {projectDetail, jobDetail} = this.props.project;
    const menu = route.map((item) => {
      return (
        <Item key={item.key}>
          <span>
            <span className="nav-text">
              {item.text}
            </span>
          </span>
        </Item>
      )
    });
    // 获取要展示的组件
    const Sub = myComponents[this.state.selectKey];
    return (
      <div>
        <Row className="detail-topbar">
          <Col span={12}>
            <h2>
              {projectDetail.name}
            </h2>
          </Col>
          <Col span={6} offset={6}>
            <Select
              style={{
              width: 150
            }}
              placeholder="请选择一个分支"
              onChange={this.handleChangeBranch}>
              {projectDetail
                .branches
                .map(branch => (
                  <Option key={branch.name} value={branch.name}>{branch.name}</Option>
                ))}
            </Select>
            <Button type="primary" onClick={this.handleStartJob}>
              手动执行
            </Button>
          </Col>
        </Row>
        <Row >
          <Col span={4} className="material-card no-padding">
            <Menu
              mode="inline"
              onClick={this.handleClick}
              defaultSelectedKeys={[this.state.selectKey]}>
              {menu}
            </Menu>
          </Col>
          <Col span={2}></Col>
          <Col span={18} className="material-card">
            <Sub
              dispatch={this.props.dispatch}
              projectDetail={projectDetail}
              jobDetail={jobDetail}
              fetchJobList={this.fetchJobList}
              showJobDetail={this.showJobDetail}
              closeJobDetail={this.closeJobDetail}
              selectJobId={this.state.selectJobId}
              routeInfo={route.filter(i => i.key == this.state.selectKey)[0]}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(function (state) {
  return {project: state.project}
})(ProjectDetail);