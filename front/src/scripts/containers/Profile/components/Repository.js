import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

const BindingList = [
  {
    key: 'coding',
    title: 'Coding',
    icon: 'icon-coding',
    desc: 'xxx',
    url(client_id, redirect_uri) {
      return `https://coding.net/oauth_authorize.html?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user%2Cuser%3Aemail%2Cnotification%2Cproject%2Cproject%3Adepot%2Cproject%3Akey`
    }
  }
]

class Container extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    let { routeInfo, state } = this.props;
    return (
      <div>
        <h1>
          {routeInfo.text}
        </h1>
        <ul>
          {BindingList.map(item => {
            return (
              <li key={item.key}>
                {item.title}{state[item.key]?`已绑定(${state[item.key].name})`:''}
                {/*关联了则显示已关联，否则显示重新关联*/}
                <Button type="primary" onClick={() => {
                    location.href = item.url(state.client_id, state.redirect_uri)
                  }}>绑定账户</Button>
                
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => ({
  state: state.user
}))(Container);