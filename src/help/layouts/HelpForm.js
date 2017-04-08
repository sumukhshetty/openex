import React, { Component } from 'react';
import HelpFormInstructions from './HelpFormInstructions';

class HelpForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      helpFormDetails: {
        email: '',
        topic: '',
        message: ''
      }
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
    console.log(this.state.helpFormDetails);
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
                className='w5 h-100' />
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
                placeholder='Transaction stuck in escrow' />
              <div className='min-w-30 me'>
                <span className='fw1 i'>What is the problem that your facing ?</span>
              </div>
            </div>

            <div className='flex mb3'>
              <label htmlFor='message' className='w5'>Message</label>
              <textarea id='message' type='textArea' onChange={this.onInputChange.bind(this)} value={this.state.helpFormDetails.message}
                className='w5' placeholder='Issues realted to specific transactions should have txid' rows='6' />
              <span className='measure-narrow fw1 i pa0 me'>Please elaborate on the problem so that support can resolve the  issue at the earliest.</span>
            </div>

            <div className='flex mv3'>
              <label className='w5 ' /><input
                type='submit'
                className='mv5'
                value='Send Request' /></div>

          </fieldset>
        </form>
      </div>
    );
  }
}

export default HelpForm;
