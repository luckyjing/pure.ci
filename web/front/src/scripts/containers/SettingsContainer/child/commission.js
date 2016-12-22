import React, {Component, PropTypes} from 'react';
import PageTitle from '../../../components/page-title';
export default class Commission extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions, state} = this.props;
  }

  render() {
    return (
      <div>
        <PageTitle title={[{title: 'Commission'}]}/>
        {this.props.state.loading ? 'true' : 'false'}
      </div>
    );
  }
}
