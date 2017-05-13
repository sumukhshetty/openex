import React, { Component } from 'react';
import EnableNotificationsContainer from './../ui/EnableNotificationsContainer'

export default class EnableNotifications extends Component {

  render () {
    console.log("EnableNotifications")
    console.log(this.props)
    console.log(this.state)
    return (
      <EnableNotificationsContainer />
    );
  }
}
