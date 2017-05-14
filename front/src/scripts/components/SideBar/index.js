import React, {Component} from 'react';
import {Link, withRouter} from 'dva/router';
import './index.less';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const route = [
  {
    path: '/',
    icon: 'home',
    text: '概览'
  }, {
    path: '/project',
    icon: 'folder',
    text: '我的项目'
  }, {
    path: '/computer',
    icon: 'user',
    text: '主机管理'
  }, {
    path: '/profile',
    icon: 'user',
    text: '代码仓库'
  }
]
class SideBar extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const {dispatch} = this.props;
  }

  render() {
    const isActive = this.props.router.isActive;
    let selectedKeys = [];
    const menu = route.map((item, index) => {
      if (isActive(item.path, true)) {
        selectedKeys.push(index.toString());
      }
      return (
        <Item key={index}>
          <Link to={item.path}>
            <span>
              <Icon type={item.icon}/>
              <span className="nav-text">
                {item.text}
              </span>
            </span>
          </Link >
        </Item>
      )
    });
    return (
      <div className="layout-siderbar">
        <div className="siderbar-logo"></div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          {menu}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SideBar);