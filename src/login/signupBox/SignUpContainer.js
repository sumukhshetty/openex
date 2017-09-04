import React, { Component } from 'react'
import SignUpFormContainer from '../../user/ui/signupform/SignUpFormContainer'

class SignUpContainer extends Component {
  render() {
    return (
      <section className="h-auto min-h-5">
        {this.props.web3.eth.accounts[0]
          ? <div className="w5 center bg-white shadow-1">
            <div className="bg-gray tc ba pv1">
              <p className="ftiny">Address</p>
              <p className="ftiny">
                {this.props.web3.eth.accounts[0]}
              </p>
            </div>
            <div className="signup-form">
              <SignUpFormContainer />
            </div>
          </div>
          : <div className="w5 center flex col mxc h-100 min-h-5 tc bg-white shadow-1 pa3">
              <p>Seems like you’re new here.</p>
              <p>
                Please <a href="https://metamask.io/">install metamask</a> and
                proceed to Sign Up.
              </p>
            </div>}
      </section>
    )
  }
}

export default SignUpContainer
