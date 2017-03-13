import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
export default class ShopIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const {actions, state} = this.props;

    return (
      <div>
        This is a shop
      </div>

    );
  }
}
