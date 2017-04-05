import React, { Component } from 'react';
import CancelIcon from '../images/svgReactComponents/Cancel';
import GearIcon from '../images/svgReactComponents/Gear';
import ClearIcon from '../images/svgReactComponents/Clear';
import { NotificationGroup } from './NotificationGroup';

export default class Notifications extends Component {

  constructor (props) {
    super(props);
    this.state = {
      notifications: [
        {
          day: 'Today',
          updates: [
            {
              time: '03:14AM',
              name: 'Ricardo Berry',
              type: 'chat',
              message: 'Please complete the payment to the account mentioned and mark the payment complete'
            },
            {
              time: '10:17PM',
              name: 'Carl Joseph',
              type: 'complete',
              message: 'Trade completed'
            }]
        },
        {
          day: 'Monday',
          updates: [
            {
              time: '3:17AM',
              name: 'Flora Gordon',
              type: 'joined'
            },
            {
              time: '02:33PM',
              name: 'Virgie Wright',
              type: 'chat',
              message: 'Hi! The problem is fixed. Thanks!'
            }]
        },
        {
          day: '7 days ago',
          updates: [
            {
              time: '03:14AM',
              name: 'Ricardo Berry',
              type: 'chat',
              message: 'Please complete the payment to the account mentioned and mark the payment complete'
            }]
        }
      ]
    };
    this.handleClear = this.handleClear.bind(this);
  }
  handleClear () {
    this.setState({updates: []});
  }

  render () {
    return (
      <div className='flex mxe absolute--fill fixed bg-black-80 z-1'>
        <div className='w5 bg-smoke pa3 overflow-y-auto'>
          <div className='flex mxb cxc'>
            <CancelIcon action={this.props.close} />
            <div className='ms pl3'>Notifications</div>
            <GearIcon />
          </div>
          <div className='flex col '>
            <div className='flex mxe mv2'>
              <ClearIcon action={this.handleClear} />
            </div>
            {
              this.state.notifications.map((notification, index) =>
                <NotificationGroup
                  key={index}
                  day={notification.day}
                  updates={notification.updates} />)
              }
          </div>
        </div>
      </div>
    );
  }
}
