import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from '../images/logo.svg'
import ezetherlogowhite from './../images/ezetherLogo.png'
import { browserHistory } from 'react-router'

export default class HomeNav extends Component {
  login() {
    this.props.login(this.props.web3)
  }

  render() {
    return (
      <nav className="db dt-l w-100 border-box pa3 ph5-l">
        <a
          className="db dtc-l v-mid white link dim w-100 w-25-l tc tl-l mb2 mb0-l"
          href="#"
          title="Home"
        >
          <img src={ezetherlogowhite} className="dib w5" alt="Ezether" />
        </a>
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
          <a
            className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
            title="About Us"
            onClick={() => browserHistory.push('/about')}
          >
            about us
          </a>
          <a
            className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
            onClick={() => browserHistory.push('/how')}
            title="How This Works"
          >
            how this works
          </a>
          <a
            className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
            onClick={() => browserHistory.push('/support')}
            title="support"
          >
            support
          </a>
          <a
            className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
            onClick={() => browserHistory.push('/login')}
            title="support"
          >
            login
          </a>
          {/* <a
            className="link dim white f6 f5-l dib mr3 mr4-l ttc pointer"
            onClick={this.login.bind(this)}
            title="login"
            >
            login
          </a> */}
          <button
            className="ba br3 b--white ttc mv3"
            onClick={() => browserHistory.push('/signup')}
          >
            sign up
          </button>
        </div>
      </nav>
    )
  }
}
