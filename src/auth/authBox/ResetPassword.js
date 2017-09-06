import React, { Component } from 'react'
import {firebaseRef} from './../index.js'

class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state ={
      email:null,
      message:''
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    var _component = this
    if (this.state.email !== null) {
    firebaseRef.auth().sendPasswordResetEmail(this.state.email).then(function(){      
      _component.setState({message:"Please check your email to reset your password"})
    }, function(error){
      var error_message
      if(error.code==="auth/user-not-found")
        error_message = "We don't have a user on record with that email address!"
      _component.setState({message:error_message})
    })
    }
  }

  render(){
    return (
      <div>
        <div>Reset Password</div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='email' id='email' name='email' onChange={this.onEmailChange.bind(this)} required/>
        <button type='submit'>Send Email</button>
        <div>{this.state.message}</div>
        </form>
      </div>
      )
  }
}

export default ResetPassword