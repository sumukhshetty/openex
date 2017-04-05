import React from 'react';
import { SingleNotification } from './SingleNotification';

export const NotificationGroup = (props) => (
  <div className='ma0 pa0'>
    <p className='mv2'>{props.day}</p>
    {props.updates.map((notification, index) =>
      <SingleNotification
        key={index}
        time={notification.time}
        name={notification.name}
        type={notification.type}
        message={notification.message} />)}
  </div>);
