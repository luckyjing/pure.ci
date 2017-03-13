import React, {Component} from 'react'
import {Row, Col} from 'antd'
import {Link} from 'react-router'
export default class ShopCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    return (
      <div className="search-card">
        <Row>
          <Col span={8} className="card-logo">
            <img style={{width:100}} src="http://oh59g24op.bkt.clouddn.com/owner.jpg" alt=""/>
          </Col>

          <Col span={16} className="card-content">
            <p className="content-title">
              Shop Name : {data.shopName}
            </p>
            <p>
              Owner Name : {data.ownerName}
            </p>
            <p>
              Shop Type : {data.shopType}
            </p>
            <p>
              Goods Number : {data.count}
            </p>
          </Col>

        </Row>
      </div>
    )
  }
}
