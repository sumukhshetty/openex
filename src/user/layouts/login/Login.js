import React, { Component } from 'react'
import LoginFormContainer from '../../ui/loginform/LoginFormContainer'

export class Login extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Login</h1>
            <p>Login Mesasge</p>
            <LoginFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Login
