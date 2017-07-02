import React, { Component } from 'react';
import * as _ from 'lodash'
import CancelIcon from './../../images/svgReactComponents/Cancel';
import GearIcon from './../../images/svgReactComponents/Gear';
import ClearIcon from './../../images/svgReactComponents/Clear';
import { NotificationGroup } from './../layouts/NotificationGroup';

export class Notifications extends Component {

  constructor (props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear () {
    this.setState({notifications: []});
  }

  render () {
    var notifications = this.props.notifications.data
    console.log(notifications)
    var arr = _.map(notifications, function(value, prop){
      return {prop: prop, value: value}
    });
    var byDateTime = arr.slice(0)
    byDateTime.sort(function(a,b){
      return b.value.createdAt - a.value.createdAt
    })
    byDateTime = Object.assign({},byDateTime)
    const rows = _.map(byDateTime, (notification,key)=>{
      return <NotificationGroup 
        key={notification.prop} 
        notificationId={notification.prop} 
        day='monday1234' 
        time={notification.value.createdAt} 
        name={notification.value.title} 
        message={notification.value.body} 
        type={notification.value.type}
        purchaseRequestId={notification.value.purchaseRequestId}
        close={this.props.close}
        />
    })
    return (
      <div className='flex mxe absolute--fill fixed bg-black-80 z-1'>
        <div className='w5 bg-smoke pa3 overflow-y-auto'>
          <div className='flex mxb cxc coal'>
            <CancelIcon action={this.props.close} />
            <div className='ms pl3'>Notifications</div>
            <GearIcon />
          </div>
          <div className='flex col '>
            <div className='flex mxe mv2'>
              <ClearIcon action={this.handleClear} />
            </div>
            {rows}
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications