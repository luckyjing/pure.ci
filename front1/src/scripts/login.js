import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './login/index.css';

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <div>
        <div className="form">
          <div className="form-toggle"></div>
          <div className="form-panel one">
            <div className="form-header">
              <h1>登录</h1>
            </div>
            <div className="form-content login-form">
              <form>
                <div className="form-group">
                  <label for="username">邮箱</label>
                  <input type="text" id="email" name="email" required="required" />
                </div>
                <div className="form-group">
                  <label for="password">密码</label>
                  <input type="password" id="password" name="password" required="required" />
                </div>
                <div className="form-group error-msg" style={{ minHeight: 25 }}>
                </div>
                <div className="form-group" >
                  <button className="log-in-btn">登 录</button>
                </div>
              </form>
            </div>
          </div>
          <div className="form-panel two">
            <div className="form-header">
              <h1>注册</h1>
            </div>
            <div className="form-content signin-form">
              <form>
                <div className="form-group">
                  <label for="nickname">昵称</label>
                  <input type="text" id="nickname" name="nickname" required="required" />
                </div>
                <div className="form-group">
                  <label for="email">邮箱</label>
                  <input type="text" id="email" name="email" required="required" />
                </div>
                <div className="form-group">
                  <label for="password">密码</label>
                  <input type="password" id="password" name="password" required="required" />
                </div>
                <div className="form-group">
                  <label for="cpassword">重复密码</label>
                  <input type="password" id="cpassword" name="cpassword" required="required" />
                </div>
                <div className="form-group signin-error">

                </div>
                <div className="form-group">
                  <button className="sign-in-btn">注 册</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('stage')
);

$(document).ready(function () {
  var panelOne = $('.form-panel.two').height(),
    panelTwo = $('.form-panel.two')[0].scrollHeight;
  function openLogin() {
    $('.form-panel.one').addClass('hidden');
    $('.form-panel.two').addClass('active');
    $('.form').animate({
      'height': panelTwo
    }, 200);
  }
  if (location.pathname.indexOf('signin') >= 0) {
    openLogin();
  }
  $('.form-panel.two').not('.form-panel.two.active').on('click', function (e) {
    e.preventDefault();
    $('.form-toggle').addClass('visible');
    openLogin();
  });

  $('.form-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).removeClass('visible');
    $('.form-panel.one').removeClass('hidden');
    $('.form-panel.two').removeClass('active');
    $('.form').animate({
      'height': panelOne
    }, 200);
  });
});

function loginError(msg) {
  $('.error-msg').text(msg);
}
function signinError(msg) {
  $('.signin-error').text(msg);
}

$('.log-in-btn').on('click', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'post',
    url: '/session',
    data: JSON.stringify({
      email: $('.login-form [name="email"]').val(),
      password: $('.login-form [name="password"]').val()
    }),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
  }).done(function (res) {
    if (res.code == 200) {
      // 成功
      location.href = '/';
    } else {
      loginError(res.msg);
    }
  })
});

$('.sign-in-btn').on('click', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'post',
    url: '/user',
    data: JSON.stringify({
      email: $('.signin-form [name="email"]').val(),
      password: $('.signin-form [name="password"]').val(),
      nickname: $('.signin-form [name="nickname"]').val(),
    }),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
  }).done(function (res) {
    if (res.code == 200) {
      // 成功
      location.href = '/';
    } else {
      signinError(res.msg);
    }
  })
});