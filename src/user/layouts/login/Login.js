import React, { Component } from 'react';
import LoginFormContainer from '../../ui/loginform/LoginFormContainer';
import UseChrome from '../../../layouts/unsupportedbrowser/UnsupportedBrowser';

export class Login extends Component {
  render () {
    const chrome = !/chrome/i.test(navigator.userAgent);

    return (
      <main className='container'>
        {chrome && <UseChrome />}
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h1>Login</h1>
            <p>Login Mesasge</p>
            <LoginFormContainer />
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
