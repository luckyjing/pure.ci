import React, {Component, PropTypes} from 'react';
import {Input, Row, Col, Select, Button} from 'antd';
import {hashHistory} from 'react-router';
const Option = Select.Option;
import PageTitle from '../../components/page-title';
import  ShopCard from './card/shop';
import CustomerCard from './card/customer';
/**
 * 支持的搜索类型
 * title为展示的文案
 * value为数据交互中使用的key值
 * @type {*[]}
 */
const searchType = [{
  title: 'Shops',
  value: 'shop'
}, {
  title: 'Customers',
  value: 'customer'
}];
export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: searchType[0].value,
      searchText: ''
    }
  }

  componentDidMount() {
    const {actions, state} = this.props;
  }

  handleSearchType(value) {
    this.setState({
      searchType: value
    })
  }

  handleSearchKeyUp(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  init() {
    this.setState({
      searchText:''
    });
    this.props.actions.init();
  }

  handleSearch() {
    const {actions} = this.props;
    if (this.state.searchText) {
      if (this.state.searchType == searchType[0].value) {
        actions.searchShop(this.state.searchText);
      } else if (this.state.searchType == searchType[1].value) {
        actions.searchCustomer(this.state.searchText);
      }
    }
  }

  render() {
    let {init, type} = this.props.state;
    let options = searchType.map((type, index)=> {
      return (
        <Option key={index} value={type.value}>{type.title}</Option>
      )
    });
    // 渲染搜索结果
    // 拿到相对应的数组，然后渲染对应的card组件
    let cardList = [],
      CardTemplate = null;
    if (!init) {
      cardList = this.props.state[type] || [];
      if (type == 'shop') {
        CardTemplate = ShopCard;
      } else if (type == 'customer') {
        CardTemplate = CustomerCard;
      }
      cardList = cardList.map((item, index)=> {
        return (
          <Col span={12} key={index}>
            <CardTemplate data={item}/>
          </Col>
        )
      });
    }
    return (
      <div>
        <PageTitle title={[{title: 'Search'}]}/>
        <Row type="flex" justify="center" align="middle" className="search-panel">
          <Col span={2}>
            <span>
              Search Type:
            </span>
          </Col>
          <Col span={4}>
            <Select size="large" defaultValue={searchType[0].value} className="search-select"
                    onSelect={this.handleSearchType.bind(this)}>
              {options}
            </Select>
          </Col>
          <Col span={12}>
            <Input placeholder="type to search" value={this.state.searchText}
          onChange={this.handleSearchKeyUp.bind(this)}
          onPressEnter={this.handleSearch.bind(this)}/>
        </Col>
          <Col span={2} className="search-button">
            <Button type="primary" icon="search" onClick={this.handleSearch.bind(this)}>
              Search
            </Button>
          </Col>
        </Row>
        {init ? '' : (
          <div className="search-result">
            <Row className="search-result-title">
              <Col span={4}>
                Search Result:
              </Col>
              <Col span={2} push={18}>
                <span className="mouse-hover" onClick={this.init.bind(this)}>
                Clear Result
                </span>
              </Col>
            </Row>
            <Row className="search-result-list">
              {cardList}
            </Row>
          </div>
        )}

      </div>
    );
  }
}
