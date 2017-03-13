import React, {Component, PropTypes} from 'react';
export default class SettingsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
