import React, { Component } from 'react';
import DashboardInfoMessage from './DashboardInfoMessage';
import ActiveEscrowList from './../../activeescrowlist/layouts/ActiveEscrowList';
import AdList from './../../adlist/layouts/AdList';
import CompletedTradeList from './../../completedtradeslist/layouts/CompletedTradeList';

import {firebaseMessaging} from './../../index.js'
import {firebaseRef} from './../../index.js'

class Dashboard extends Component {
  componentWillMount () {
    console.log("Dashboard")
    console.log(firebaseMessaging)
    console.log(firebaseRef)
    firebaseMessaging.getToken()
      .then(function(currentToken){
        var user = firebaseRef.auth().currentUser
        if(currentToken){
          firebaseRef.database().ref("/users/"+user.uid+"/fcmToken/").set(currentToken)
        } else{
          firebaseRef.database().ref("/users/"+user.uid+"/fcmToken/").set(null)
          //TODO updateUIForPushPermissionRequired
          }
        })
      .catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
          var user = firebaseRef.auth().currentUser
          firebaseRef.database().ref("/users/"+user.uid+"/fcmToken/").set(null)

      })
/*    firebaseMessaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      return firebaseMessaging.getToken()
    })
    .then(function(token){
      console.log(token)
      var user = firebaseRef.auth().currentUser
      console.log(user.uid)
      //firebaseRef.database().ref("/users/"+user.uid+"/fcmToken/").set(token)
      //sendTokenToServer(token)
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
      var user = firebaseRef.auth().currentUser
      //firebaseRef.database().ref("/users/"+user.uid+"/fcmToken/").set(null)
    });*/
  }

  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center pv3'>
          <div>
            <div>
              <DashboardInfoMessage />
              <ActiveEscrowList />
              <AdList />
              <CompletedTradeList />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
