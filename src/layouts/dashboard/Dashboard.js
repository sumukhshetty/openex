import React, { Component } from 'react';
import DashboardInfoMessage from './DashboardInfoMessage';
import ActiveTrades from './../../activetrades/layouts/ActiveTrades';
import TradeAdvertisements from './../../tradeadvertisements/layouts/TradeAdvertisements'

import EnableNotifications from './../../enablenotifications/layouts/EnableNotifications'
import CompletedTrades from './../../completedtrades/layouts/CompletedTrades'
import DisputedTrades from './../../disputedtrades/layouts/DisputedTrades'

import WrongNetwork from './../wrongnetwork/WrongNetwork'
import LockedAccount from './../lockedaccount/LockedAccount'
import WrongAccount from './../wrongaccount/WrongAccount'
import UserPresenceContainer from './../../userpresence/UserPresenceContainer'
import NotLiveCountryContainer from './../../country/NotLiveCountryContainer'
//import LoadingContracts from './../../loadingcontracts/LoadingContracts'

import Kyc from './kyc/layouts/Kyc'

import {firebaseMessaging} from './../../index.js'
import {firebaseRef} from './../../index.js'

import factoryAddress from './../../contract_addresses/orderfactory.js'

class Dashboard extends Component {

  componentWillMount () {
    // TODO change this to mainnet
    console.log("Dashboard.componentWillMount")
    this.props.loadOrderBookFactory(this.props.web3.data, factoryAddress.kovanOrderFactoryAddress)
    this.props.loadETHOrderBook(this.props.web3.data, this.props.user)
    this.props.checkBrowserWalletAddress(this.props.web3.data, this.props.user)
    firebaseMessaging.onTokenRefresh(function () {
      firebaseMessaging.getToken()
    .then(function (refreshedToken) {
      console.log('Token refreshed.')
      var user = firebaseRef.auth().currentUser
      if (refreshedToken) {
        firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(refreshedToken)
      } else {
        firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(null)
        // TODO updateUIForPushPermissionRequired
      }
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      // setTokenSentToServer(false);
      // Send Instance ID token to app server.
      // sendTokenToServer(refreshedToken);
      // ...
    })
    .catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err)
      var user = firebaseRef.auth().currentUser
      firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(null)
      // showToken('Unable to retrieve refreshed token ', err);
    })
    })
    firebaseMessaging.getToken()
      .then(function (currentToken) {
        var user = firebaseRef.auth().currentUser
        if (currentToken) {
          firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(currentToken)
        } else {
          firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(null)
          // TODO updateUIForPushPermissionRequired
        }
      })
      .catch(function (err) {
        console.log('An error occurred while retrieving token. ', err)
        var user = firebaseRef.auth().currentUser
        firebaseRef.database().ref('/users/' + user.uid + '/fcmToken/').set(null)
      })
  }

  render () {
    if(!this.props.web3.wrongnetwork){
      if(this.props.web3.locked){
        return (
          <LockedAccount />
          )
      }
      if(this.props.user.correctUserAccount){
        if(this.props.user.profile.country !== 'IN'){
          return(
            <NotLiveCountryContainer />
            )
        } else {
          return (
            <section className='bg-smoke'>
              <div className='w-75 center pv3'>
                <div>
                  <div>
                    <EnableNotifications />
                    <Kyc/>
                    <DashboardInfoMessage />
                    <ActiveTrades />
                    <TradeAdvertisements />
                    <CompletedTrades />
                    <DisputedTrades />
                    <UserPresenceContainer />
                  </div>
                </div>
              </div>
            </section>
          )
        }
      } else {
        return (
          <WrongAccount walletAddress={this.props.user.data.uid}/>
          )
      }
    } else {
      return (
        <WrongNetwork/>
        )
    }
  }
}

export default Dashboard
