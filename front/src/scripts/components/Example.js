import React, { Component } from 'react';

export default class Example extends Component {
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({
      type: 'example/fetch',
      payload: {}
    })
  }
  onClick(id) {
    let { dispatch } = this.props;
    if (!id) return;
    dispatch({
      type: 'users/removeItem',
      payload: { id }
    });
  }
  render() {
    let { example } = this.props;
    return (
      <ul>
        {
          example.data && example.data.map((item) => {
            return (<li key={item.id} onClick={this.onClick.bind(this, item.id)}>{item.name}</li>)
          })
        }
      </ul>
    );
  }
}
