import React, { Component }  from 'react';
import { SingleNotification } from './SingleNotification';

export class NotificationGroup extends Component {
  render(){
    return (
      <div className='ma0 pa0'>
          <SingleNotification
            key={this.props.notificationId}
            time={this.props.time}
            name={this.props.name}
            type={this.props.type}
            message={this.props.message} 
            purchaseRequestId={this.props.purchaseRequestId}
            close={this.props.close}
            />
      </div>
      )
  }
}

export default NotificationGroup