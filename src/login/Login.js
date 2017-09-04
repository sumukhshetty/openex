import React from 'react'
import PropTypes from 'prop-types'
import SignUpContainer from './signupBox/SignUpContainer'
import { FormattedMessage } from 'react-intl'

const Login = ({ loadinguserdata, web3, presence }) =>
  <div className="w-100 bg-smoke pa3">
    <div className="w-75 center flex wrap pv4">
      <div className="w-50 pt3">
        <SignUpContainer web3={web3.data} />
      </div>
      <div className="w-50 pa3">
        <div className="pl3">
          <h1>
            <FormattedMessage id="login.header" />
          </h1>
          <p>
            <FormattedMessage id="login.P1" />
          </p>
          <p>
            <FormattedMessage id="login.P2" />
          </p>
        </div>
      </div>
    </div>
    <div className="w-75 center">
      <p>
        <FormattedMessage id="login.P3" />
      </p>
      <p>
        <FormattedMessage id="login.P4" />
      </p>
    </div>
  </div>

Login.propTypes = {
  loadinguserdata: PropTypes.array.isRequired,
  web3: PropTypes.array.isRequired,
  presence: PropTypes.array.isRequired
}
Login.defaultProps = {}

export default Login
