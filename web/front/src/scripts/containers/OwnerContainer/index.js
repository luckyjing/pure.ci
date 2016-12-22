import React, {Component, PropTypes} from 'react';
import {Row, Col, Button} from 'antd'
import PageTitle from '../../components/page-title';
import '../../../css/card.less'
export default class CustomerContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getInfo();
  }

  addBlackList(index){
    const {actions} = this.props;
    actions.addBlackCus(this.props.state.ownerList[index].userId,index);
  }

  deleteCustomer(index){
    const {actions} = this.props;
    actions.deleteCus(this.props.state.ownerList[index].userId,index);
  }

  render() {
    let data = this.props.state;
    var arr=[];
    data.ownerList.map((item,index)=>{
      if (item.state!=3){
        if (item.state!=2){
          arr.push(
            <div key={index} className="search-card">
              <Row>
                <Col span={8} className="card-logo">
                  <img style={{width:100}} src="http://oh59g24op.bkt.clouddn.com/customer.jpg" alt=""/>
                </Col>

                <Col span={16} className="card-content">
                  <p className="content-title">
                    Owner Name : {item.customerName}

                  </p>
                  <p>
                    User ID:{item.userId}
                  </p>
                  <p>
                    Phone : {item.phone}
                  </p>
                  <p>
                    Email : {item.email}
                  </p>
                  <p>
                    Count: {item.count}
                  </p>
                </Col>
                <Col>
                  <Button style={{display:"block",marginBottom:25}} type="primary" icon="add" onClick={this.addBlackList.bind(this,index)}>
                    Add Black List
                  </Button>
                  <Button type="primary" icon="delete" onClick={this.deleteCustomer.bind(this,index)}>
                    Delete
                  </Button>
                </Col>

              </Row>
            </div>
          )
        }
        else{
          arr.push(
            <div key={index} className="search-card">
              <Row>
                <Col span={8} className="card-logo">
                  <img style={{width:100}} src="http://oh59g24op.bkt.clouddn.com/customer.jpg" alt=""/>
                </Col>

                <Col span={16} className="card-content">
                  <p className="content-title">
                    Owner Name : {item.customerName}

                  </p>
                  <p>
                    User ID:{item.userId}
                  </p>
                  <p>
                    Phone : {item.phone}
                  </p>
                  <p>
                    Email : {item.email}
                  </p>
                  <p>
                    Count: {item.count}
                  </p>
                </Col>
                <Col>
                  <p style={{marginBottom:25}}>
                    Black List!
                  </p>
                  <Button type="primary" icon="delete" onClick={this.deleteCustomer.bind(this,index)}>
                    Delete
                  </Button>
                </Col>

              </Row>
            </div>
          )
        }
      }
    })
    return (
      <div>
        <div>
          <PageTitle title={[{title: 'Owner'}]}/>
        </div>
        {arr}
      </div>
    );
  }
}
