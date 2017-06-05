import React, { Component } from 'react';
import { browserHistory } from 'react-router'

export default class Kyc extends Component {

  render () {
    try{
      if(!this.props.user.profile.kycComplete){
        return (
          <div>Automte needs you to provide <a onClick={()=>browserHistory.push('/kyc')}>ID proof</a> to enlist your ads on the exchange.
          </div>
          )
      } else {
        return(
          <div></div>
        )  
      }

    } catch (e){
      return(
        <div></div>
      )
    }
  }
}
