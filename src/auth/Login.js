import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { loginUser } from './authBox/LoginFormActions'
import * as actions from '../header/HomeNavActions'

const Login = ({ loadinguserdata, web3, presence, user, login }) =>
  <div className="w-100 bg-smoke pa3">
    <div className="w-75 center flex wrap pv4">
      <div className="w-50 pt3 flex x">
        <section className="h-auto">
          {web3.data.eth.accounts[0]
            ? <div className="w5 center bg-white shadow-1">
                <div className="bg-gray tc ba pv1">
                  <p className="ftiny">Address</p>
                  <p className="ftiny">
                    {web3.data.eth.accounts[0]}
                  </p>
                </div>
                <div className="w5 center flex col mxc h-100 pv3 tc bg-white shadow-1 pa3">
                  <button
                    type="submit"
                    className="pure-button pure-button-primary"
                    onClick={() => login(web3)}
                  >
                    Login
                  </button>
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

// Login.propTypes = {
//   loadinguserdata: PropTypes.array.isRequired,
//   web3: PropTypes.array.isRequired,
//   presence: PropTypes.array.isRequired
// }
// Login.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: web3 => {
      dispatch(actions.login(web3))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
