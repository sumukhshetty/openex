import React, { Component } from 'react';
import { HiddenOnlyAuth } from './util/wrappers.js';

import Web3 from 'web3';
import truffleConfig from './../truffle-config.js';
import getWeb3 from './util/getWeb3';

// for cypress testing
// var TestRPC = require('ethereumjs-testrpc')

var request = require('request');
//var fetch = require('fetch')

import { firebaseRef } from './index';

import logo from './images/logo.svg';
import AutoLogoLight from './images/svgReactComponents/autoLogoLight.js';

// UI Components
import EtherPriceContainer from './etherprice/EtherPriceContainer';
import UserPresenceContainer from './userpresence/UserPresenceContainer';
import Header from './header/Header';
import OnlyAuthLinks from './header/AuthenticatedHeader';
import Footer from './footer/Footer';
import AccountWatcher from './web3/AccountWatcherContainer';

// Styles
import './css/pure-min.css';
import './css/styles-common.css';
import './css/atomic.css';
import './css/swatch.css';
import './css/forms.css';

import { default as Toast } from 'react-notify-toast';

import LoadingUserData from './loadinguserdata/LoadingUserData';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotifications: false,
      web3: null,
      notifications: null
    };
    this.web3Initialize.bind(this);
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.web3Initialize(results.web3);
      //dispatch(web3Init(results.web3))
    });
  }

  componentDidMount() {
    this.props.getCountry();
    this.props.getUsers();
  }

  web3Initialize(web3) {
    if (typeof web3 !== 'undefined') {
      // Use the Mist/wallet provider.
      // DEVELOPER NOTE: removing the next commented line will break the app
      // eslint-disable-next-line

      var web3Provided = new Web3(web3.currentProvider);
      this.props.setWeb3(web3Provided);

      // for cypress testing
      // var web3Provided = new Web3(TestRPC.provider())
      // this.props.setWeb3(web3Provided)
    } else {
      // DEVELOPER NOTE: What happens in the wild if the
      // user does not have a browser based wallet? What happens
      // if the Web3 object cannot be initialized with the httpProvider
      // given from the loction in the truffle-config file?
      // dev haiku
      // this.web3Provided = new Web3(
      //   new Web3.providers.HttpProvider(web3Location)
      // )
    }
  }

  showNotifications = () => {
    this.setState({ showNotifications: true });
  };

  removeNotifications = () => {
    this.setState({ showNotifications: false });
  };

  render() {
    const OnlyGuestLinks = HiddenOnlyAuth(() => (
      <div>
        <Header />
        <div className="h4 h3-l w-100" />
      </div>
    ));

    const noMobileWhenLoggedIn = () => (
      <div className="absolute absolute--fill gradient white">
        <div className="flex col x h-100">
          <AutoLogoLight />
          <p className="w5">
            Hey guys, decentralized browsers haven't been developed for mobile
            phones as of yet.
          </p>
          <p className="w5">
            To trade ether, please head to ezether.com through the desktop, and
            we will make sure you get your ether as soon as possible.
          </p>
          <p className="w5">
            Sorry for the inconvenience, we hope to serve you today.
          </p>
        </div>
      </div>
    );

    const isMobile = window.innerWidth <= 800;
    if (isMobile && firebaseRef.auth().currentUser) {
      return <noMobileWhenLoggedIn />;
    } else {
      if (this.props.loadinguserdata.data) {
        return <LoadingUserData />;
      } else {
        const unsupportedBrowser =
          !/chrome/i.test(navigator.userAgent) &&
          !/firefox/i.test(navigator.userAgent);

        const UseSupportedBrowser = (
          <div className="absolute bg-danger w-100 z-1 flex mxa cxc mt3">
            <p className="white tc ph3">
              Transactions are only supported on Chrome & Firefox at the moment.
            </p>
            <div>
              <button className="white ba br3 b--white ttc mv3 bg-danger bg-white-hover danger-hover">
                Use Firefox
              </button>
            </div>

            <div>
              <button className="white ba br3 b--white ttc mv3 bg-danger bg-white-hover danger-hover">
                Use Chrome
              </button>
            </div>
          </div>
        );
        return (
          <main className="Site">
            <AccountWatcher />
            <Toast />
            {/*<EtherPriceContainer />*/}
            <OnlyGuestLinks />
            <OnlyAuthLinks
              showNotifications={this.showNotifications}
              removeNotifications={this.removeNotifications}
              notificationStatus={this.state.showNotifications}
            />
            {/* {unsupportedBrowser && <UseSupportedBrowser />} */}
            {/*<UserPresenceContainer />*/}
            <section
              role="main"
              className={firebaseRef.auth().currentUser && 'bg-smoke'}
            >
              {this.props.children}
            </section>

            <Footer />
          </main>
        );
      }
    }
  }
}
