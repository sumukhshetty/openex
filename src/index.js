import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
//import Dashboard from './layouts/dashboard/Dashboard'
import DashboardContainer from './layouts/dashboard/DashboardContainer'
import WrongNetwork from './layouts/wrongnetwork/WrongNetwork'
import PostTradeForm from './posttrade/layouts/PostTradeForm'
import Login from './user/layouts/login/Login'

import Help from './help/layouts/Help'
import HelpConfirmation from './help/layouts/HelpConfirmation'
import HTMLStyles from './css/HTMLStyles.js'
import Static from './staticPages/Master/Static'
import UserScreen from './userScreen/layouts/UserScreen'
import TermsOfService from './termsofservice/TermsOfService'
import ResetPassword from './signup/ResetPassword'
import Admin from './admin/layouts/Admin'

import BuyTradeAdvertisement from './buytradeadvertisement/layouts/BuyTradeAdvertisement'
import BuyTradeAdvertisements from './buytradeadvertisements/layouts/BuyTradeAdvertisements'
import SellTradeAdvertisement from './selltradeadvertisement/layouts/SellTradeAdvertisement'
import SellTradeAdvertisements from './selltradeadvertisements/layouts/SellTradeAdvertisements'
import EditTradeAdvertisement from './edittradeadvertisement/layouts/EditTradeAdvertisement'

import ActiveTrade from './activetrade/layouts/ActiveTrade'
// Redux Store
import store from './store'
import * as firebase from 'firebase'
import * as _firebaseconfig from './../secrets/firebaseconfig'
import * as useractions from './user/userActions'


var config = {
  apiKey: _firebaseconfig._apiKey,
  authDomain: _firebaseconfig._authDomain,
  databaseURL: _firebaseconfig._databaseURL,
  storageBucket: _firebaseconfig._storageBucket,
  messagingSenderId: _firebaseconfig._messagingSenderId
}
export var firebaseRef = firebase.initializeApp(config)
export var firebaseMessaging = firebase.messaging()
export const firebaseStorage = firebase.storage()
const history = syncHistoryWithStore(browserHistory, store)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function (registration) {
    console.log('Registration successful, scope is:', registration.scope)
  }).catch(function (err) {
    console.log('Service worker registration failed, error:', err)
  })
}

export var FIREBASE_TIMESTAMP = firebase.database.ServerValue.TIMESTAMP

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='dashboard' component={UserIsAuthenticated(DashboardContainer)} />
        <Route path='wrongnetwork' component={WrongNetwork} />
        <Route path='admin' component={UserIsAuthenticated(Admin)} />
        <Route path='login' component={UserIsNotAuthenticated(Login)} />
        <Route path='sellether' component={UserIsAuthenticated(BuyTradeAdvertisements)}/>
        <Route path='buyether' component={UserIsAuthenticated(SellTradeAdvertisements)} />
        <Route path='help' component={UserIsAuthenticated(Help)} />
        <Route path='help/confirmation' component={UserIsAuthenticated(HelpConfirmation)} />
        <Route path='posttrade' component={UserIsAuthenticated(PostTradeForm)} />
        <Route path='user/:userUid' component={UserIsAuthenticated(UserScreen)} />
        <Route path='selltradeadvertisement/:sellTradeAdvertisementId' component={UserIsAuthenticated(SellTradeAdvertisement)} />
        <Route path='buytradeadvertisement/:buyTradeAdvertisementId' component={UserIsAuthenticated(BuyTradeAdvertisement)}/>
        <Route path='activetrade/:purchaseRequestId' component={UserIsAuthenticated(ActiveTrade)} />
        <Route path='edittradeadvertisement/:tradeAdvertisementType/:tradeAdvertisementId' component={UserIsAuthenticated(EditTradeAdvertisement)} />
        <Route path='termsofservice' component={UserIsAuthenticated(TermsOfService)} />
        <Route path='password/reset' component={UserIsNotAuthenticated(ResetPassword)} />
        <Route path='html' component={HTMLStyles} />
        <Route path='static' component={Static} />
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('root')
)

setTimeout(function () {
  store.dispatch(useractions.startListeningUserAuth())
})
