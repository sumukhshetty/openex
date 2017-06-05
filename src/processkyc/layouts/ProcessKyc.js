import React, { Component } from 'react';
import ProcessKycContainer from './../ui/ProcessKycContainer'

export default class ProcessKyc extends Component {

  render () {
    return (
      <div>
      <ProcessKycContainer country={this.props.params.country} userUid={this.props.params.userUid}/>
      </div>
    );
  }
}
