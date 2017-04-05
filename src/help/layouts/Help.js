import React, { Component } from 'react';
// TODO import HelpContainer
import Notifications from '../../notifications/NotificationsLayout';

class Help extends Component {
  render () {
    return (
      <main className='container'>
        <Notifications />
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h1>Help</h1>
            <p>The help screen on the exchange</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Help;
