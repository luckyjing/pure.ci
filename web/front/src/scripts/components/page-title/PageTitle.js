import React, {Component, PropTypes} from 'react'
import {Menu, Icon, Row, Col, Breadcrumb} from 'antd'
import {Link} from 'react-router'
const Item = Breadcrumb.Item;
import './index.less'
/* example
 titleArray = [{
 title: 'Shops',
 href: '/shops'
 }, {
 title: 'Shops Detail'
 }]
 */
export default class PageTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {title} = this.props;
    if (!title) {
      return console.error('PageTitle出错');
    }
    let breadCrumb = title.map((t, i)=> {
      if (t.href) {
        return (
          <Item key={i}>
            <Link to={t.href}>
              {t.title}
            </Link>
          </Item>
        )
      } else {
        return (
          <Item key={i}>
            {t.title}
          </Item>
        )
      }
    });
    return (
      <Row className="page-title">
        <Col span={12}>
          <div className="pageTitle">
            <Breadcrumb>
              {breadCrumb}
            </Breadcrumb>
          </div>
        </Col>
      </Row>
    )
  }
}
