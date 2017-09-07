import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'
import { loginUser } from './authBox/LoginFormActions'
import * as actions from '../header/HomeNavActions'
import { browserHistory } from 'react-router'

const Login = ({ loadinguserdata, web3, presence, user, login }) =>
  <div className="w-100 bg-smoke pa3">
    <div className="w-75 center flex wrap pv4">
      <div className="w-50 pt3 flex x">
        <section className="h-auto">
          {web3.data.eth.accounts[0]
            ? <div className="w5 center bg-white shadow-1">
                <div className="bg-gray tc ba pv1">
                  <p className="ftiny">
                    <FormattedMessage id="login.authBoxAddress" />
                  </p>
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
                    <FormattedMessage id="login.loginButton" />
                  </button>
                </div>
              </div>
            : <div className="w5 center flex col mxc h-100 min-h-5 tc bg-white shadow-1 pa3">
                <p>
                  <FormattedMessage id="login.authBoxNoEntryP1" />
                </p>
                <p>
                  <FormattedMessage
                    id="login.authBoxNoEntryP2"
                    values={{
                      metamaskLink: (
                        <a href="https://metamask.io/" target="_blank">
                          install metamask
                        </a>
                      )
                    }}
                  />
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
        <FormattedMessage
          id="login.P3"
          values={{
            signupLink: (
              <a onClick={() => browserHistory.push('/signup')} target="_blank">
                Signup Page
              </a>
            )
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="login.P4"
          values={{
            supportLink: (
              <a
                onClick={() => browserHistory.push('/support')}
                target="_blank"
              >
                Support
              </a>
            )
          }}
        />
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
