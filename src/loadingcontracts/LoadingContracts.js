import React, { Component } from 'react';
var Spinner = require('react-spinkit');
//import { Spinner } from 'react-spinkit'

export default class LoadingContracts extends Component {

  render () {
    return (
      <div className="flex mxc pv5">
      <div> please wait while we grab your smart contracts </div>
      <div>
      <Spinner name="circle"/>
      </div>
      </div>
      )
  }
}
