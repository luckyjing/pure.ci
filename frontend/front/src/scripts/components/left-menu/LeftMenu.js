import React, {Component, PropTypes} from 'react'
import {IndexLink, Link} from 'react-router'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
export default class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      current: 'dashboard'
    }
  }
componentDidMount(){

}
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu theme='dark'
            onClick={this.handleClick}
            style={{width: 240}}
            defaultOpenKeys={[]}
            selectedKeys={[this.state.current]}
            mode="inline"
      >
        <Item key="dashboard">
          <Icon type="desktop"/>
          <Link to="/">Dashboard</Link>
        </Item>
        <Item key="search">
          <Icon type="search"/>
          <Link to="/search">Search</Link>
        </Item>
        <Item key="notice">
          <Icon type="notification"/>
          <Link to="/notice">Notice</Link>
        </Item>
        <Item key="Advertising Management">
              <Icon type="export"/><Link to="/ad"><span>Advertising Management</span></Link>
        </Item>
        <Item key="shops">
          <Icon type="home"/>
          <Link to="/shops">Shops Management</Link>
        </Item>
        <Item key="customers">
          <Icon type="user"/>
          <Link to="/customer">Customers Management</Link>
        </Item>
        <Item key="owners">
          <Icon type="user"/>
          <Link to="/Owner">Owner Management</Link>
        </Item>
        <Item key="order">
          <Icon type="file-text"/>
          <Link to="/order">Order Management</Link>
        </Item>
        <SubMenu key="sub2"
                 title={<span><Icon type="appstore-o"/><span>System Management</span></span>}>
          <Menu.Item key="5"><Icon type="minus"/><Link to="/system/income">Income Management</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4"
                 title={<span><Icon type="setting"/><span>Settings</span></span>}>
          <Menu.Item key="9"><Icon type="minus"/><Link to="/settings/commission">Commission Rate</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
