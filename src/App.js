import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

import Web3 from 'web3'
import truffleConfig from './../truffle-config.js'
import getWeb3 from './util/getWeb3'

var request = require('request')
//var fetch = require('fetch')
var web3Location = `http://${truffleConfig.networks.development
  .host}:${truffleConfig.networks.development.port}`

import { firebaseRef } from './index'

import logo from './images/logo.svg'
import AutoLogoLight from './images/svgReactComponents/autoLogoLight.js'

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import EtherPriceContainer from './etherprice/EtherPriceContainer'
import UserPresenceContainer from './userpresence/UserPresenceContainer'
import Header from './header/Header'

// Styles
import './css/pure-min.css'
import './css/styles-common.css'
import './css/atomic.css'
import './css/swatch.css'
// import logo from './images/logo.svg'

import Bell from './images/svgReactComponents/Bell'
import NotificationsContainer from './notifications/ui/NotificationsContainer'
import { default as Toast } from 'react-notify-toast'
import LoadingUserData from './loadinguserdata/LoadingUserData'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotifications: false,
      web3: null
    }
    this.removeNotifications = this.removeNotifications.bind(this)
    this.showNotifications = this.showNotifications.bind(this)
    this.web3Initialize.bind(this)
  }

  componentWillMount() {
    console.log("App.componentWillMount")
    getWeb3.then(results => {
      console.log('getWeb3.then')
      console.log(results.web3)
      this.web3Initialize(results.web3)
      //dispatch(web3Init(results.web3))  
    })

  }

  componentDidMount(){
    this.props.getCountry()
  }

  web3Initialize(web3) {

    if (typeof web3 !== 'undefined') {
      // Use the Mist/wallet provider.
      // DEVELOPER NOTE: removing the next commented line will break the app
      // eslint-disable-next-line
      var web3Provided = new Web3(web3.currentProvider)
      this.props.setWeb3(web3Provided)
      // this.setState({web3:web3Provided})
    } else {
      // DEVELOPER NOTE: What happens in the wild if the
      // user does not have a browser based wallet? What happens
      // if the Web3 object cannot be initialized with the httpProvider
      // given from the loction in the truffle-config file?
      // dev haiku
      this.web3Provided = new Web3(
        new Web3.providers.HttpProvider(web3Location)
      )
    }
  }

  showNotifications() {
    this.setState({ showNotifications: true })
  }

  removeNotifications() {
    this.setState({ showNotifications: false })
  }

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => {
      return (
        <div className="menu">
          <div className="w-75 center">
            {this.state.showNotifications &&
              <NotificationsContainer close={this.removeNotifications} />}
            <div className="pure-g flex mxb cxc ">
              <div className="pure-u-1-4 brand">
                <Link to="/admin">
                  <img
                    className="brand"
                    src={logo}
                    alt="Automte Ether Exchange"
                  />
                </Link>
              </div>
              <div className="flex mxe cxc">
                <Bell action={this.showNotifications} />
                <LogoutButtonContainer />
              </div>
            </div>
            <nav className="pure-menu pure-menu-horizontal">
              <ul className="flex mxb ma0 pa0">
                <li className="pure-menu-item">
                  <Link
                    to="/dashboard"
                    activeStyle={{
                      color: 'white',
                      borderBottom: '2px solid white'
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="pure-menu-item">
                  <Link
                    to="/buyether"
                    activeStyle={{
                      color: 'white',
                      borderBottom: '2px solid white'
                    }}
                  >
                    Buy
                  </Link>
                </li>
                <li className="pure-menu-item">
                  <Link
                    to="/sellether"
                    activeStyle={{
                      color: 'white',
                      borderBottom: '2px solid white'
                    }}
                  >
                    Sell
                  </Link>
                </li>
                <li className="pure-menu-item">
                  <Link
                    to="/posttrade"
                    activeStyle={{
                      color: 'white',
                      borderBottom: '2px solid white'
                    }}
                  >
                    Post a Trade
                  </Link>
                </li>
                <li className="pure-menu-item">
                  <Link
                    to="/help"
                    activeStyle={{
                      color: 'white',
                      borderBottom: '2px solid white'
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )
    })

    const OnlyGuestLinks = HiddenOnlyAuth(() => <Header />)

    const isMobile = window.innerWidth <= 800
    if (isMobile) {
      return (
        <div className="absolute absolute--fill gradient white">
          <div className="flex col x h-100">
            <AutoLogoLight />
            <p>Sorry Guys!</p>
            <p className="w5">Mobile is not supported as of now.</p>
          </div>
        </div>
      )
    } else {
      if (this.props.loadinguserdata.data) {
        return <LoadingUserData />
      } else {
        return (
          <section className="Site">
            <Toast />
            {/* ISSUE-341 */}
            {/*moved this to actions*/}
            {/*<Web3InitContainer />*/}
            <EtherPriceContainer />
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <main
              role="main"
              className={firebaseRef.auth().currentUser && 'bg-smoke'}
            >
              {this.props.children}
            </main>
          </section>
        )
      }
    }
  }
}

export default App
