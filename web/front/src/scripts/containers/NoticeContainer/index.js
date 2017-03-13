import React, {Component, PropTypes} from 'react';
import PageTitle from '../../components/page-title';
export default class NoticeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions,state} = this.props;
  }

  render() {
    return (
      <div>
        <PageTitle title={[{title: 'Notice'}]}/>
      </div>
    );
  }
}
