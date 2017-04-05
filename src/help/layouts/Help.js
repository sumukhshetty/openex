import React, { Component } from 'react';
// TODO import HelpContainer
import Notifications from '../../notifications/NotificationsLayout';
import HelpForm from './HelpForm';

class Help extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showNotifications: true
    };
    this.removeNotifications = this.removeNotifications.bind(this);
  }

  removeNotifications () {
    this.setState({showNotifications: false});
  }

  render () {
    return (
      <div className='bg-smoke'>
        { this.state.showNotifications && <Notifications close={this.removeNotifications} />}
        <div className='w-75 center pv3'>
          <HelpForm />
        </div>
      </div>
    );
  }
}

export default Help;
