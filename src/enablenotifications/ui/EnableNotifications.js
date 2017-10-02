import React, { Component } from 'react';
import Notifications from '../../images/onboarding/notifications.js';
import Completed from '../../images/onboarding/complete.js';

export default class EnableNotifications extends Component {
  componentWillMount() {
    this.props.onBeforeComponentLoad(this.props.user);
  }

  enableNotifications() {
    this.props.givePermission(this.props.user);
  }

  dontShowAgain() {
    this.props.dontShowAgain(this.props.user);
  }

  render() {
    try {
      if (this.props.user.profile.shownotificationrequest) {
        return (
          <div
            className="flex cxc pv3 pl5 pointer grow"
            onClick={this.enableNotifications.bind(this)}
          >
            <Notifications />
            <p className="ml3 blue">Allow Trade Notifications</p>
          </div>
        );
      } else {
        return (
          <div className="flex cxc pv3 pl5">
            <Completed />
            <p className="ml3">Allow Trade Notifications</p>
          </div>
        );
      }
    } catch (e) {
      return <div />;
    }
  }
}
