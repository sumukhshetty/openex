import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

import { firebaseRef } from './index'

import logo from './images/logo.svg'
import AutoLogoLight from './images/svgReactComponents/autoLogoLight.js'

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import Web3InitContainer from './web3/Web3InitContainer'
import EtherPriceContainer from './etherprice/EtherPriceContainer'
import UserPresenceContainer from './userpresence/UserPresenceContainer'
import Header from './header/Header'
import Footer from './footer/Footer'

// Styles
import './css/pure-min.css'
import './css/styles-common.css'
import './css/atomic.css'
import './css/swatch.css'
// import logo from './images/logo.svg'

import Bell from './images/svgReactComponents/Bell'
import Notifications from './notifications/NotificationsLayout'
import {default as Toast} from 'react-notify-toast'

const request = require('request')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNotifications: false
    }
    this.removeNotifications = this.removeNotifications.bind(this)
    this.showNotifications = this.showNotifications.bind(this)
  }

  showNotifications () {
    this.setState({showNotifications: true})
  }

  removeNotifications () {
    this.setState({showNotifications: false})
  }

  render () {
    const OnlyAuthLinks = VisibleOnlyAuth(() => {
      return (
        <div className='menu'>
          <div className='w-75 center'>
            {this.state.showNotifications && <Notifications close={this.removeNotifications} />}
            <div className='pure-g flex mxb cxc '>
              <div className='pure-u-1-4 brand'>
                <Link to='/admin'>
                  <img className='brand' src={logo} alt='Automt Ether Exchange' />
                </Link>
              </div>
              <div className='flex mxe cxc'>
                <Bell action={this.showNotifications} />
                <LogoutButtonContainer />
              </div>
            </div>
            <nav className='pure-menu pure-menu-horizontal'>
              <ul className='flex mxb ma0 pa0'>
                <li className='pure-menu-item'>
                  <Link to='/dashboard' activeStyle={{ color: 'white', borderBottom: '2px solid white' }}> Dashboard
                  </Link>
                </li>
                <li className='pure-menu-item'>
                  <Link to='/buyorders' activeStyle={{ color: 'white', borderBottom: '2px solid white' }}> Buy
                  </Link>
                </li>
                <li className='pure-menu-item'>
                  <Link to='/sellorders' activeStyle={{ color: 'white', borderBottom: '2px solid white' }}> Sell
                  </Link>
                </li>
                <li className='pure-menu-item'>
                  <Link to='/posttrade' activeStyle={{ color: 'white', borderBottom: '2px solid white' }}> Post a Trade
                  </Link>
                </li>
                <li className='pure-menu-item'>
                  <Link to='/help' activeStyle={{ color: 'white', borderBottom: '2px solid white' }}> Help
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>)
    }
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() => <Header />)

    const isMobile = window.innerWidth <= 800
    if (isMobile) {
      return (
        <div className='absolute absolute--fill gradient white'>
          <div className='flex col x h-100'>
            <AutoLogoLight />
            <p>Sorry Guys!</p>
            <p className='w5'>Mobile is not supported as of now.</p>
          </div>
        </div>
      )
    } else {
      return (
        <section className='Site'>
          <Toast />
          <OnlyGuestLinks />
          <Web3InitContainer />
          <EtherPriceContainer />
          <OnlyAuthLinks />
          {firebaseRef.auth().currentUser && <UserPresenceContainer />}
          <main role='main' className={firebaseRef.auth().currentUser && 'bg-smoke'}>
            {this.props.children}
          </main>
          <Footer />
        </section>
      )
    }
  }
}

export default App
