import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      loginInfo: {}
    }
  }

  onInputChange(event) {
    var _loginInfo = this.state.loginInfo
    if(event.target.id === "email"){
      _loginInfo = Object.assign({}, 
        this.state.loginInfo, {email:event.target.value}
      )
    }
    if(event.target.id === "password"){
      _loginInfo = Object.assign({}, 
        this.state.loginInfo, {password:event.target.value}
      )
    }
    this.setState({ loginInfo: _loginInfo })
  }

  handleSubmit(event) {
    event.preventDefault()
    // TODO do any other validation on the signup form here
/*    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }*/
    this.props.onLoginFormSubmit(this.state.loginInfo, this.props.web3.web3)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={this.state.loginInfo.email} onChange={this.onInputChange.bind(this)} placeholder="Email" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="password">password</label>
          <input id="password" type="password" value={this.state.loginInfo.password} onChange={this.onInputChange.bind(this)} placeholder="Password" />
          <span className="pure-form-message">This is a required field.</span>

          <br />


          <button type="submit" className="pure-button pure-button-primary">Login</button>
        </fieldset>
      </form>
    )
  }
}

export default LoginForm
