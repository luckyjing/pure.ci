import React, {Component, PropTypes} from 'react'
import LeftMenu from '../../../components/left-menu'
import {Row, Col} from 'antd'
export default class DefaultComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let {children} = this.props;
    return (
      <Row className="layout-login">
        <Col className="login-aside" span={8}>
          <Row type="flex" justify="center" align="middle" className="login-logo-wrapper">
            <Col span={24}>
              <img src="http://oh59g24op.bkt.clouddn.com/shopLogo.png" alt="" className="login-logo"/>
            </Col>
            <Col span={24}>
              <h1>For Brief &Brilliant Buy & Sale</h1>
            </Col>
          </Row>
        </Col>
        <Col className="login-container" span={16}>
          {children}
        </Col>
      </Row>
    );
  }
}
