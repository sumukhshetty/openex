import React, { Component } from 'react'
// TODO import HelpContainer

class DashboardInfoMessage extends Component {
  render() {
    return (
      <p className="b pv3 measure-wide" data-test="dashboardMessage">
        In these pages you can view and manage your current advertisements and
        contacts.
      </p>
    )
  }
}

export default DashboardInfoMessage
