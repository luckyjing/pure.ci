import React, {Component, PropTypes} from 'react';
import {Row, Col, Input} from 'antd';
import $ from 'jquery-ajax';
import {hashHistory} from 'react-router';
import './index.less';
export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      invaild: false,
      processing: false
    };
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
  }

  handleName(e) {
    this.setState({
      userName: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  login() {
    this.setState({
      invalid:true,
      processing: true
    });

    $.ajax({
      url: '/administrator/ajax/login.json',
      type:'post',
      data: {
        userName: this.state.userName,
        password: this.state.password
      },
      dataType: 'json'
    }).then(res=> {
      if (res.code == 200) {
        // login success
        hashHistory.push('/');
        window.location.reload();
      } else {
        this.setState({
          invaild: true,
          processing: false
        })
      }
    })
  }

  render() {
    return (
      <Row className="login-dialog">
        <Col span={12} offset={6}>
          <Row className="login-row">
            <Col span={24}>
              <h1 className="login-title">Administrator Login</h1>
            </Col>
          </Row>
          <Row className="login-row">
            <Col span={6}>
              <h3>Name:</h3>
            </Col>
            <Col span={18}>
              <Input size="large" onChange={this.handleName} placeholder="UserName"/>
            </Col>
          </Row>
          <Row className="login-row">
            <Col span={6}>
              <h3>Password:</h3>
            </Col>
            <Col span={18}>
              <Input size="large" type="password" onChange={this.handlePassword} placeholder="password"/>
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <p className="error-msg">
                {this.state.invaild ? 'UserName or Password is invalid' : ''}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <button className="login-btn" onClick={this.login} disabled={this.state.processing}>
                {this.state.processing ? 'Logining' : 'Login'}
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
