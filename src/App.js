import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import Web3InitContainer from './web3/Web3InitContainer'
import ProfileNotificationWallet from './profilenotificationwallet/layouts/ProfileNotificationWallet'
import Header from './header/Header'
import Footer from './footer/Footer'

// Styles
import './css/pure-min.css'
import './css/styles-common.css'
import './css/atomic.css'
import './css/swatch.css'
import logo from './images/logo.svg'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div className="menu">
        <div className="container">
          <nav className="pure-menu pure-menu-horizontal">
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
                <Link to="/buyorders">View Buy Orders</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/help">Help</Link>
              </li>
              <li className="pure-menu-item">
                <ProfileNotificationWallet />
              </li>
              <LogoutButtonContainer />
            </ul>
          </nav>
        </div>
      </div>
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
        {/* TODO: cleanup the following components */}
        <Header />
        <Web3InitContainer/>
        <OnlyAuthLinks />
        <main role="main">
          {this.props.children}
        </main>
        <Footer />
      </section>
    );
  }
}

export default App
