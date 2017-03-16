import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      signUpInfo: {},
      email:'',
      password:'',
      web3: this.props.web3
    }
  }

  componentWillMount(){
    this.setState({signUpInfo:Object.assign({}, 
        this.state.signUpInfo, {address:this.props.web3.web3.coinbase}
      )})
  }

  onInputChange(event) {
    var _signUpInfo = this.state.signUpInfo
    if(event.target.id === "email"){
      _signUpInfo = Object.assign({}, 
        this.state.signUpInfo, {email:event.target.value}
      )
    }
    if(event.target.id === "password"){
      _signUpInfo = Object.assign({}, 
        this.state.signUpInfo, {password:event.target.value}
      )
    }
    this.setState({ signUpInfo: _signUpInfo })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onSignUpFormSubmit(this.state.signUpInfo, this.props.web3.web3)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={this.state.signUpInfo.email} onChange={this.onInputChange.bind(this)} placeholder="Email" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="password">password</label>
          <input id="password" type="password" value={this.state.signUpInfo.password} onChange={this.onInputChange.bind(this)} placeholder="Email" />
          <span className="pure-form-message">This is a required field.</span>

          <br />


          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
