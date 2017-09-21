import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../auth/authBox/loginActions'
import { Link } from 'react-router'
import logo from '../images/logo.svg'
import ezetherlogowhite from './../images/ezetherLogo.png'
import { browserHistory } from 'react-router'

class Header extends Component {
  login() {
    this.props.login(this.props.web3)
  }
  render() {
    return (
      <header className="bg-blue z-999 fixed-IMPORTANT">
        <nav className="db dt-l w-100 border-box pa3 ph5-l">
          <a
            className="db dtc-l v-mid white link dim w-100 w-25-l tc tl-l mb2 mb0-l pointer"
            title="Home"
            onClick={() => browserHistory.push('/')}
          >
            <img src={ezetherlogowhite} className="dib w5" alt="Ezether" />
          </a>
          <div className="nowrap overflow-x-auto tc tr-l">
            <a
              className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
              title="About Us"
              onClick={() => browserHistory.push('/about')}
            >
              about us
            </a>
            <a
              className="link dim white f6 f5-l dn dib-m dib-l mr3 mr4-l ttc pointer dn"
              onClick={() => browserHistory.push('/guide')}
              title="How This Works"
            >
              how this works
            </a>
            <a
              className="link dim white f6 f5-l mr3 mr4-l ttc pointer dn dib-m dib-l"
              onClick={() => browserHistory.push('/support')}
              title="support"
              data-test="SupportPageButton"
            >
              support
            </a>
            <a
              data-test="navLogin"
              className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
              onClick={() => browserHistory.push('/login')}
              title="Login"
            >
              login
            </a>

            <button
              className="ba br3 b--white ttc mv3"
              onClick={() => browserHistory.push('/signup')}
            >
              sign up
            </button>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: web3 => {
      dispatch(actions.login(web3))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
