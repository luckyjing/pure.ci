import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'antd';
import './index.less'
export default class NotFoundContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions, state} = this.props;
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle" className="error-container">
        <Col span={16}>
          <Link to="/">
            <img src="http://7xlqsb.com1.z0.glb.clouddn.com/404.png" alt=""/>
          </Link>
        </Col>
      </Row>
    );
  }
}
