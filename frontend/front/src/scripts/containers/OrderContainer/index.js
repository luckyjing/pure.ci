import React, {Component, PropTypes} from 'react';
import PageTitle from '../../components/page-title';
import {Input,Row, Col, Button} from 'antd'
export default class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchText:''
    }
  }

  componentDidMount() {
    const {actions, state} = this.props;
    actions.getOrderList();
  }

  handleSearchKeyUp(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleApplication(index){
    const {actions} = this.props;
    actions.getInfo2(this.props.state.orderList[index].orderNumber);
}


  handleSearch(){
    const {actions} = this.props;
    actions.getInfo(this.state.searchText);
  }

  render() {
    let data = this.props.state;
    var arr=[];
    data.orderList.map((item,index)=>{
      if (item.state==0){
        arr.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={16} className="card-content">
                <p className="content-title">
                  Order Number : {item.orderNumber}
                </p>
                <p>
                  Total Price:{item.totalPrice}
                </p>
              </Col>
              <Col>
                <p>Awaiting payment</p>
              </Col>

            </Row>
          </div>
        )
      }
      else if(item.state==1){
        arr.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={16} className="card-content">
                <p className="content-title">
                  Order Number : {item.orderNumber}
                </p>
                <p>
                  Total Price:{item.totalPrice}
                </p>
              </Col>
              <Col>
                <p>Awaiting shipment</p>
              </Col>
            </Row>
          </div>
        )
      }
      else if(item.state==2){
        arr.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={16} className="card-content">
                <p className="content-title">
                  Order Number : {item.orderNumber}
                </p>
                <p>
                  Total Price:{item.totalPrice}
                </p>
              </Col>
              <Col>
                <p>Awaiting delivery</p>
              </Col>
            </Row>
          </div>
        )
      }
      else if(item.state==3){
        arr.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={16} className="card-content">
                <p className="content-title">
                  Order Number : {item.orderNumber}
                </p>
                <p>
                  Total Price:{item.totalPrice}
                </p>
              </Col>
              <Col>
                <p>Awaiting comment</p>
              </Col>
            </Row>
          </div>
        )
      }
      else if(item.state==4){
        arr.push(
          <div key={index} className="search-card">
            <Row>
              <Col span={16} className="card-content">
                <p className="content-title">
                  Order Number : {item.orderNumber}
                </p>
                <p>
                  Total Price:{item.totalPrice}
                </p>
              </Col>
              <Col>
                <Button type="primary" icon="agree" onClick={this.handleApplication.bind(this,index)}>Confirm</Button>
              </Col>
            </Row>
          </div>
        )
      }
    })
    return (
      <div>
        <PageTitle title={[{title: 'Order'}]}/>
        <Row type="flex" justify="center" align="middle" className="search-panel">
          <Col span={12}>
            <Input placeholder="search" value={this.state.searchText}
                   onChange={this.handleSearchKeyUp.bind(this)}
                   onPressEnter={this.handleSearch.bind(this)}/>
          </Col>
          <Col span={2} className="search-button">
            <Button type="primary" icon="search" onClick={this.handleSearch.bind(this)}>
              Search
            </Button>
          </Col>
        </Row>
        {arr}
      </div>
    );
  }
}
