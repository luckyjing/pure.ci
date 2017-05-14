import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline, Button, Table, Icon, Row, Col, Menu } from 'antd';
import Toast from '../../utils/toast';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
import * as myComponents from './components/index';
const Repository = myComponents.Repository;
const route = [
  {
    key: 'BaseInfo',
    text: '个人信息'
  }, {
    key: 'Repository',
    text: '代码托管'
  }
]

class Profile extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selectKey: route[0].key
    }
  }
  handleClick(item) {
    let key = item.key;
    this.setState({
      selectKey: key
    })
  }
  render() {
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
        <Repository/>
        {/*<Row >
          <Col span={4} className="material-card no-padding">
            <Menu
              mode="inline"
              onClick={this.handleClick}
              defaultSelectedKeys={[this.state.selectKey]}
            >
              {menu}
            </Menu>
          </Col>
          <Col span={2}>
          </Col>
          <Col span={18} className="material-card">
            <Sub
              routeInfo={route.filter(i => i.key == this.state.selectKey)[0]}
            />
          </Col>
        </Row>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.dashboard
  };
}

export default connect(mapStateToProps)(Profile);
