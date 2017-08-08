import React, { Component } from 'react';
import HelpFormInstructions from './HelpFormInstructions';
import { browserHistory} from 'react-router'
import {firebaseFunctionsUrl} from './../../index.js'

var request = require('request')

class SupportForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      helpFormDetails: {
        email: '',
        topic: '',
        message: ''
      },
      isButtonDisabled:false
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange (event) {
    var _helpFormDetails = this.state.helpFormDetails;
    if (event.target.id === 'email') {
      _helpFormDetails['email'] = event.target.value;
    } else if (event.target.id === 'topic') {
      _helpFormDetails['topic'] = event.target.value;
    } else if (event.target.id === 'message') {
      _helpFormDetails['message'] = event.target.value;
    }
    this.setState({ helpFormDetails: _helpFormDetails });
  }

  handleSubmit (event) {
    event.preventDefault();
    var postData = {
      "email": this.state.helpFormDetails.email,
      "message": this.state.helpFormDetails.message,
      "topic": this.state.helpFormDetails.topic,
    }
    this.setState({isButtonDisabled:true})
    var _url = firebaseFunctionsUrl + 'helpForm'
    request({
      method:'post',
      body:{postData:postData},
      json:true,
      url: _url
    },
    function(err, res, body){
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      if(res.statusCode === 200) {
        // DESIGNER NOTE: Is this the best place to send the user to, maybe some kind of confirmation screen
        console.log("confirmTrade.200")
        browserHistory.push('/help/confirmation')
      }
      if(res.statusCode === 500) {
        console.error('Server responded with an error: ' + res.body.error);
        this.setState({isButtonDisabled:false})
        throw res.body.error
      }
    })    
  }

  render () {
    return (
      <div>
        <div>
          <HelpFormInstructions />
        </div>
        <form className='mv3' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset >
            <legend className='b f4 pv5'>Trade Information</legend>

            <div className='flex mv3'>
              <label htmlFor='email' className='w5' >Return Email</label>
              <input
                id='email'
                name='email'
                type='email'
                value={this.state.helpFormDetails.email} onChange={this.onInputChange.bind(this)}
                placeholder='Enter your Email'
                className='w5 h-100' required/>
              <span className='measure-narrow fw1 i pa0 me'>What is the email address you prefer to use for further communication.</span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='topic' className='w5' >Topic</label>
              <input
                id='topic'
                name='topic'
                type='text'
                value={this.state.helpFormDetails.topic} onChange={this.onInputChange.bind(this)}
                className='w5 h-100'
                placeholder='Transaction stuck in escrow' required/>
              <div className='min-w-30 me'>
                <span className='fw1 i'>What is the problem that you're facing ?</span>
              </div>
            </div>

            <div className='flex mb3'>
              <label htmlFor='message' className='w5'>Message</label>
              <textarea id='message' type='textArea' onChange={this.onInputChange.bind(this)} value={this.state.helpFormDetails.message}
                className='w5' placeholder='Issues realted to specific transactions should have txid' rows='6' required/>
              <span className='measure-narrow fw1 i pa0 me'>Please elaborate on the problem so that support can resolve the  issue at the earliest.</span>
            </div>

            <div className='flex mv3'>
              <label className='w5 ' /><input
                type='submit'
                className='mv5'
                value='Send Request' disabled={this.state.isButtonDisabled}/></div>

          </fieldset>
        </form>
      </div>
    );
  }
}

export default SupportForm;
