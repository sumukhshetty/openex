import React, { Component } from 'react';
import ChatIcon from './../../images/svgReactComponents/Chat';
import CompleteIcon from './../../images/svgReactComponents/Complete';
import JoinedIcon from './../../images/svgReactComponents/Joined';

import { browserHistory } from 'react-router'
const moment = require('moment')

export class SingleNotification extends Component {
  constructor(props){
    super(props)
    this.goToTrade = this.goToTrade.bind(this)
  }

  goToTrade(){
    this.props.close()
    var url = '/activetrade/'+this.props.purchaseRequestId 
    browserHistory.push(url)
  }
  render () {
    let icon;
    switch (this.props.type) {
      case 'buyerconfirmspayment':
        icon = <ChatIcon />;
        break;
      case 'buyercreatespurchaserequest':
        icon = <CompleteIcon />;
        break;
      case 'sellercreatespurchaserequest':
        icon = <CompleteIcon />;
        break;
      case 'buyerconfirmspayment':
        icon = <CompleteIcon />;
        break;
      case 'sellerconfirmstrade':
        icon = <CompleteIcon />;
        break;
      case 'sellerreleasesether':
        icon = <CompleteIcon />;
        break;
      case 'arbiterreleasestoseller':
        icon = <CompleteIcon />;
        break;
      case 'arbiterreleasestobuyer':
        icon = <CompleteIcon />;
        break;
      case 'joined':
        icon = <JoinedIcon />;
        break;
      default:
        return null;
    }
    let time = moment(this.props.time).fromNow()
    return (
      <div onClick={this.goToTrade}className='bg-white pa2 mv3 flex col coal'>
        <div className='flex cxc mxb'>
          {icon}
          <p className='b ma0 pa0'>
            {this.props.name}
          </p>
          <small className='gray'>{time}</small>
        </div>
        {this.props.message &&
         <p className='gray'>
           {this.props.message}
         </p>}
      </div>
    );
  }
}

export default SingleNotification
