import React, {Component} from 'react';
import {Row, Col, Menu, Dropdown, Icon} from 'antd';
import './index.less';

class TopBar extends Component {
  constructor() {
    super();
    this.handleMenuClick = this
      .handleMenuClick
      .bind(this);
  }
  componentDidMount() {
    const {dispatch} = this.props;
  }
  async handleMenuClick(item, key, keyPath) {
    if (item.key == 'logout') {}
  }
  render() {
    const {userState, layout} = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <a href="/logout">登出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Row className="layout-topbar" type="flex" justify="start" align="middle">
        <Col span="16">
          {layout.pageName}
        </Col>
        <Col span="8">
          <Row type="flex" justify="start" align="middle">
            <Col span={3}>
              {userState.logo
                ? <img src={userState.logo} alt="" className="logo"/>
                : ''}
            </Col>
            <Col span={8}>
              <Dropdown overlay={menu} trigger={['click']}>
                <div className="user-name">
                  {userState.nickname}
                  <Icon type="down"/>
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default TopBar;