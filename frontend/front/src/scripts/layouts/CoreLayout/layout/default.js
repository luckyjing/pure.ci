import React, {Component, PropTypes} from 'react'
import LeftMenu from '../../../components/left-menu'
import {Row, Col, Menu, Dropdown, Icon} from 'antd'
import $ from 'jquery-ajax';
import {hashHistory} from 'react-router';
var logOut = function() {
  $.ajax({url: '/administrator/ajax/logout.json', type: 'get', data: {}, datatype: 'json'}).done(function() {
    location.href = '/administrator';
  })
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <span onClick={logOut}>Log out</span>
    </Menu.Item>
  </Menu>
);

export default class DefaultComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let {children} = this.props;
    return (

      <div className='container'>
        <div className="layout-aside">
          <aside className="layout-sider">
            <div className="layout-logo">
              <p>Administrator</p>
            </div>
            <LeftMenu/>
          </aside>
          <div className="layout-main">
            <div className="layout-container">
              <Row className="layout-content-header">
                <Col span={4} push={22}>
                  <div className="icon-wrapper">
                    <img src="http://img.zcool.cn/community/018c4255cee7f132f875202f64e916.jpg" alt="" className="img-circle"/>
                  </div>
                  <div className="user-info">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span>root</span>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
              <div className="layout-content-wrapper">
                <div className="layout-content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
