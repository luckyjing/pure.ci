import React, {Component} from 'react'
import {Row, Col} from 'antd'
import {Link} from 'react-router'
export default class CustomerCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    return (
      <div className="search-card">
        <Row>
          <Col span={8} className="card-logo">
            <img style={{width:100}} src="http://oh59g24op.bkt.clouddn.com/customer.jpg" alt=""/>
          </Col>

          <Col span={16} className="card-content">
            <p className="content-title">
              Customer Name : {data.customerName}
            </p>
            <p>
              Phone : {data.phone}
            </p>
            <p>
              Email : {data.email}
            </p>
            <p>
              Count: {data.count}
            </p>
          </Col>

        </Row>
      </div>
    )
  }
}
