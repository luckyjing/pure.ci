import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Card} from 'antd';

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
    const {dispatch} = this.props;
  }

  render() {
    let {state} = this.props;
    return (
      <div>
        <ul>
          {BindingList.map(item => {

            let title = item.title + '（未关联）';
            let bindInfo = '';
            let bindAction = '立即关联';
            if (state[item.key]) {
              title = item.title + '（已关联）';
              bindAction = '重新关联';
              bindInfo += `${state[item.key].name}`;
            }
            const control = <a
              onClick={() => {
              location.href = item.url(state.client_id, state.redirect_uri)
            }}>关联账户</a>;
            return (
              <li key={item.key}>
                <Card
                  className="bind-card"
                  title={title}
                  extra={control}
                  style={{
                  width: 300
                }}>
                  <img
                    className="bind-card-img"
                    src="https://dn-coding-net-production-static.qbox.me/static/7a51352fa766f4176d7c4543339e0e98.png"
                    alt=""/>
                  <p>{bindInfo}</p>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => ({state: state.user}))(Container);