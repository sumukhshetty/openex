import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import Phone from 'react-phone-number-input'

import rrui from 'react-phone-number-input/rrui.css'
import rpni from 'react-phone-number-input/style.css'

const moment = require('moment')

export default class Kyc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      phone: null,
      otp: null,
      error: ''
    }
  }

  submitPhoneNumber(event) {
    event.preventDefault()
    if(Phone.isValidPhoneNumber(this.state.phone, this.props.user.profile.country)) {
      console.log('Valid phone number: ' + this.state.phone);
      console.log(Phone.parsePhoneNumber(this.state.phone).phone);
      this.props.verifyPhoneNumber(Phone.parsePhoneNumber(this.state.phone).phone, this.props.user.profile.country, this.props.user.data.uid)
    } else {
      this.setState({error: 'Please input a valid phone number for your country (' + this.props.user.profile.country + ')'})
      console.log('invalid phone number: ' + this.state.phone);
    }
  }

  submitOTP(event) {
    event.preventDefault()
    console.log(this.state.otp);
    this.props.verifyOTP(this.props.user.profile.phoneNumber, this.props.user.profile.country, this.state.otp, this.props.user.data.uid)
  }

  otpChanged(e) {
    this.setState({otp: e.target.value, error: ''})
  }

  render () {
    let otpExpired = false;
    if(this.props.user.profile.otpSent) {
      otpExpired = moment().diff(moment(this.props.user.profile.otpSent), 'minutes') > 10;
    }
    try{
      if(!this.props.user.profile.verifiedPhoneNumber){
        return (
          <div>
          {!this.props.user.profile.otpSent &&
          <div>
            <p>EZ Ether needs you to verify a phone number to enlist your ads on the exchange.</p>
            <form onSubmit={this.submitPhoneNumber.bind(this)}>
              <Phone value={this.state.phone} onChange={ phone => this.setState({ phone: phone, error: '' }) } country={this.props.user.profile.country} countries={[this.props.user.profile.country]}/>
              <button type="submit">Verify Number</button>
            </form>
            <p>{this.state.error}</p>
          </div>}
          {this.props.user.profile.otpSent && otpExpired &&
          <div>
            <p>EZ Ether needs you to verify a phone number to enlist your ads on the exchange.</p>
            <p>Your previous code has expired, please verify again.</p>
            <form onSubmit={this.submitPhoneNumber.bind(this)}>
              <Phone value={this.state.phone} onChange={ phone => this.setState({ phone: phone, error: '' }) } country={this.props.user.profile.country} countries={[this.props.user.profile.country]}/>
              <button type="submit">Verify Number</button>
            </form>
            <p>{this.state.error}</p>
          </div>}
          {this.props.user.profile.otpSent && !otpExpired &&
            <div>
              <p>Please input the code sent to your phone to verify your number. The verification code is valid for 10 minutes.</p>
              <form onSubmit={this.submitOTP.bind(this)}>
                <input type='number' onChange={this.otpChanged.bind(this)} />
                <button type="submit">Submit Code</button>
              </form>
              <p>{this.state.error}</p>
            </div>
          }
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
