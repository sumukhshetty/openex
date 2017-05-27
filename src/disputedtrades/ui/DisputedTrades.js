import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class DisputedTrades extends Component {

  render () {
    if (this.props.user.profile.isAdmin) {
      console.log("ui.DisputedTrades user is admin")
      return (
        <tbody>
          <a onClick={()=>browserHistory.push('/admin')}> Go to admin</a>
        </tbody>
      );
    } else {
      console.log("ui.DisputedTrades user is not admin")
      return (
        <div></div>
      );
    }
  }
}

export default DisputedTrades;
