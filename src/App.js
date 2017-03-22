import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import Web3InitContainer from './web3/Web3InitContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/styles-common.css'
import logo from './images/logo.svg'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/buyorders">Buy</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/sellorders">Sell</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/posttrade">Post a Trade</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/help">Help</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/buyorders">View Buy Orders</Link>
        </li>
        <LogoutButtonContainer />
      </ul>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    )

    return (
      <section className="App">
        <header>
          <div className="container">
            <div className="pure-g">
              <div className="pure-u-1-4 brand">
                <Link to="/">
                  <img className="brand" src={logo} alt="" />
                </Link>
              </div>
              <div className="pure-u-3-4 menu">
                <nav className="pure-menu pure-menu-horizontal">
                  <Web3InitContainer/>
                  <OnlyGuestLinks />
                  <OnlyAuthLinks />

                </nav>
              </div>
              <div>
                <ProfileNotificationWalletContainer />
              </div>
            </div>
          </div>
        </header>

        {this.props.children}
      </section>
    );
  }
}

export default App
