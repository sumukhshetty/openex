import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import Phone from 'react-phone-number-input'

import rrui from 'react-phone-number-input/rrui.css'
import rpni from 'react-phone-number-input/style.css'

export default class Kyc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      phone: null
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if(Phone.isValidPhoneNumber(this.state.phone, this.props.user.profile.country)) {
      console.log('Valid phone number');
    } else {
      console.log('invalid phone number');
    }
  }

  render () {
    try{
      if(!this.props.user.profile.kycComplete){
        return (
          <div>
            <p>EZ Ether needs you to verify a phone number to enlist your ads on the exchange.</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Phone value={this.state.phone} onChange={ phone => this.setState({ phone: phone }) } country={this.props.user.profile.country} countries={[this.props.user.profile.country]}/>
              <button type="submit">Send OTP</button>
            </form>
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
