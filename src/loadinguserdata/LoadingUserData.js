import React, { Component } from 'react';
var Spinner = require('react-spinkit');
//import { Spinner } from 'react-spinkit'

export default class LoadingUserData extends Component {

  render () {
    return (
      <div className="flex mxc pv5">
      <div>
      <Spinner name="circle" color="white"/>
      </div>
      </div>
      )
  }
}
