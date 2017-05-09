import React, {Component} from 'react';

class Status extends Component {
  componentDidMount() {
    const {hostname, port} = this.props;
    this.socket = io('http://' + hostname + ':' + port);
    setInterval(() => {
      this.socket.emit('esm_change');
    }, 1000);
    this
      .socket
      .on('esm_start', function (data) {
        data[0]
          .responses
          .pop();
        data[0]
          .os
          .pop();
        console.log(data);
      });
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Status;