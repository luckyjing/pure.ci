import React, {Component, PropTypes} from 'react';
import {Input, Row, Col, Button} from 'antd';
import PageTitle from '../../components/page-title';
import {Tabs} from 'antd';
import '../../layouts/CoreLayout/layout.less'
const TabPane = Tabs.TabPane;
export default class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page1: false,
      page2: false
    }
  }

  componentDidMount() {
    const {actions, state} = this.props;
    if (!this.state.page1) {
      actions.getInfo(()=> {
        this.setState({
          page1: true
        })
      })
    }
  }

  getApplication() {
    const {actions}=this.props;
    if (!this.state.page2) {
      actions.getInfo3(()=> {
        this.setState({
          page2: true
        })
      })
    }
  }

  deleteShop(index) {
    const {actions} = this.props;
    actions.deleteSh(this.props.state.shopList[index].shopId);
  }

  handleApplication(index, code) {

    const {actions} = this.props;
    actions.getInfo2(this.props.state.shopRequestList[index].shopApplicationId, code)
  }

  render() {

    let data = this.props.state;
    var arr = [];
    var arr2 = [];

    data.shopList.map((item, index)=> {
      if (item.state ==0){
        arr2.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={8} className="card-logo">
                <img style={{width: 100}} src="http://oh59g24op.bkt.clouddn.com/owner.jpg" alt=""/>
              </Col>

              <Col span={16} className="card-content">
                <p className="content-title">
                  Shop Name : {item.shopName}
                </p>
                <p>
                  Shop ID : {item.shopId}
                </p>
                <p>
                  Owner Name : {item.ownerName}
                </p>
                <p>
                  Shop Type : {item.shopType}
                </p>
                <p>
                  Goods Number : {item.count}
                </p>
              </Col>
              <Col span={2} className="search-button">
                <Button type="primary" icon="delete" onClick={this.deleteShop.bind(this, index)}>
                  delete
                </Button>
              </Col>
            </Row>
          </div>)
      }
    })

    data.shopRequestList.map((item, index)=> {
      arr.push(
        <div key={index} className="search-card">
          <Row>
            <Col span={8} className="card-logo">
              <img style={{width: 100}} src="http://oh59g24op.bkt.clouddn.com/owner.jpg" alt=""/>
            </Col>

            <Col span={16} className="card-content">
              <p className="content-title">
                Shop Name : {item.shopName}
              </p>
              <p>
                Shop Application Id : {item.shopApplicationId}
              </p>
              <p>
                Owner Name : {item.ownerName}
              </p>
              <p>
                Shop Type : {item.shopTypeName}
              </p>
              <p>
                Shop Describe:{item.shopDescribe}
              </p>
              <p>
                Application Date:{item.shopApplicationDate}
              </p>
            </Col>
            <Col span={2} className="search-button">
              <Button type="primary" icon="agree" onClick={this.handleApplication.bind(this, index, 1)}>
                Agree
              </Button>
            </Col>
            <Col span={2} className="search-button">
              <Button type="primary" icon="refuse" onClick={this.handleApplication.bind(this, index, 2)}>
                Refuse
              </Button>
            </Col>
          </Row>
        </div>)
    })

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.getApplication.bind(this)}>

          <TabPane tab="All Shops" key="1">
            <div>
              <PageTitle title={[{title: 'All Shops'}]}/>
              {arr2}
            </div>
          </TabPane>

          <TabPane tab="Requests to shop" key="2">
            <div>
              <PageTitle title={[{title: 'Shop Requests'}]}/>
            </div>
            {arr}
          </TabPane>

        </Tabs>
      </div>
    );
  }
}
