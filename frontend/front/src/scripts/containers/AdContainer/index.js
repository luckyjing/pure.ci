import React, {Component, PropTypes} from 'react';
import PageTitle from '../../components/page-title';
import {Button,Row,Col} from 'antd';
import {Tabs} from 'antd';
import '../../layouts/CoreLayout/layout.less'
const TabPane = Tabs.TabPane;
export default class AdContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page1: false,
      page2: false
    }
  }

  componentDidMount() {
    const {actions,state} = this.props;
    if (!this.state.page1) {
      actions.getInfo(()=> {
        this.setState({
          page1: true
        })
      })
    }
  }

  addAdList(index,code){
    const {actions} = this.props;
    actions.getInfo2(this.props.state.adShopList[index].adApplicationId,code);
  }

  handleApplication(index,code){
    const {actions} = this.props;
    actions.getInfo3(this.props.state.adGoodList[index].adApplicationId,code,index)
  }

  getApplication(){
    const {actions} = this.props;
    if (!this.state.page2) {
      actions.getInfo4(()=> {
        this.setState({
          page2: true
        })
      })
    }
  }

  render() {
    let data = this.props.state;
    var arr = [];
    var arr2 = [];

    data.adShopList.map((item, index)=> {
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
                Application Id : {item.adApplicationId}
              </p>
              <p>
                Owner Name : {item.ownerName}
              </p>
              <p>
                Shop Describe : {item.adDescribe}
              </p>
              <p>
                Application Date : {item.applicationDate}
              </p>
            </Col>
            <Col span={2} className="search-button">
              <Button type="primary" icon="agree" onClick={this.addAdList.bind(this, index,1)}>
                Agree
              </Button>
            </Col>
            <Col span={2} className="search-button">
              <Button type="primary" icon="refuse" onClick={this.addAdList.bind(this, index,2)}>
                Refuse
              </Button>
            </Col>
          </Row>
        </div>)
    })

    data.adGoodList.map((item, index)=> {
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
                Application Id : {item.adApplicationId}
              </p>
              <p>
                Product Name : {item.productName}
              </p>
              <p>
                Product Describe:{item.adDescribe}
              </p>
              <p>
                Application Date:{item.applicationDate}
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

          <TabPane tab="Shops" key="1">
            <div>
              <PageTitle title={[{title: 'Shops'}]}/>
              {arr2}
            </div>
          </TabPane>

          <TabPane tab="Goods" key="2">
            <div>
              <PageTitle title={[{title: 'Goods'}]}/>
            </div>
            {arr}
          </TabPane>

        </Tabs>
      </div>
    );
  }
}
