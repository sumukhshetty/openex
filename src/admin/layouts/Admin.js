import React, { Component } from 'react';
import AdminContainer from './../ui/AdminContainer'

export default class Admin extends Component {

  render () {
    console.log("Admin")
    console.log(this.props)
    console.log(this.state)
    return (
      <AdminContainer />
    );
  }
}
