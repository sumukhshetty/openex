import React, { Component } from 'react';

const moment = require('moment')

export default class UserScreen extends Component {
  componentWillMount(){
    this.props.onBeforeComponentLoad(this.props.userScreenUid, this.props.users)
  }

  componentWillUnmount(){
    this.props.onBeforeComponentUnmount()
  }

  render () {
    if(this.props.userScreen.data){
      return (
        <div className='w-100 bg-smoke'>
          <div className='w-75 center pv3'>
            <h1 className='pv1'>{this.props.userScreen.data.username}</h1>
            <div>
              <h2>User Information</h2>
              <div className='w-100'>
                <ul className='lh-copy flex col wrap w-100 vh-50 list'>
                  <tr className='w-50 bg-bone flex cxc'>
                    <td className='w4 pv2'>Trade Volume</td>
                    <td className='green pl3'>{this.props.userScreen.data.tradeVolume} Ether</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Confirmed Trades</td>
                    <td className='pl3'>{this.props.userScreen.data.numberOfTrades.toString()}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Traded with</td>
                    <td className='pl3'>with {this.props.userScreen.data.numberOfTradePartners} different partners</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Feedback Score</td>
                    <td className='pl3'>{this.props.userScreen.data.avgFeedback}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>First Purchase</td>
                    <td className='pl3'>{this.props.userScreen.data.firstPurchase} ago</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Account Created</td>
                    <td className='pl3'>{moment(this.props.userScreen.data.accountCreated).fromNow()}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Last Seen</td>
                    <td className='pl3'>{moment(this.props.userScreen.data.lastOnline).fromNow()}</td>
                  </tr> 
{/*                  <tr className='w-50'>
                    <td className='w4 pv2'>Language</td>
                    <td className='pl3'>{this.state.language}</td>
                  </tr>*/}
                  <tr className='w-50'>
                    <td className='w4 pv2'>Email</td>
                    <td className='pl3'>Verified {this.props.userScreen.data.verifiedEmail.toString()}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Phone Number</td>
                    <td className='pl3'>Verified {this.props.userScreen.data.verifiedPhoneNumber.toString()}</td>
                  </tr>
                  {/*<tr className='w-50'>
                    <td className='w4 pv2'>Trust</td>
                    <td className='pl3'>{this.state.accountCreated} people</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Blocks</td>
                    <td className='pl3'>{this.state.language} people</td>
                  </tr>*/}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <div className='mt5'>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>Loading ... </div>
        )
    }
  }
}
