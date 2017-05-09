import React, {Component} from 'react';
import {connect} from 'dva';
import List from './list';
import Status from './status';
class ComputerContainer extends Component {
  constructor() {
    super();
    this.state = {
      hostname: '',
      port: 3000
    }
  }
  componentDidMount() {
    this
      .props
      .dispatch({type: 'layout/pageName', payload: '主机管理'});
  }
  setPC = (hostname, port) => {
    this.setState({hostname, port});
  }
  render() {
    return (
      <div className="material-card">

        <List {...this.props} setPC={this.setPC}/> {this.state.hostname
          ? (<Status hostname={this.state.hostname} port={this.state.port}/>)
          : ''}
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {state: state.computer}
}

export default connect(mapStatetoProps)(ComputerContainer);