import React, { Component } from 'react'

class SignUpForm extends Component {
  render() {
    return(
      <form action="#" className="pure-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="username" type="text" placeholder="Username" />
        <select name="country" id="name">
          <option value="--">Select Country</option>
          <option value="India">India</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </select>
        <button type="submit" className="pure-button pure-button-primary spaced-button gradient right">
          Sign up &rarr;
        </button>
      </form>
    )
  }
}

export default SignUpForm
