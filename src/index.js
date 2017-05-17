import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import PostTradeForm from './posttrade/layouts/PostTradeForm'
import OrdersList from './orderslist/layouts/OrdersList'
import OrderDetail from './orderdetail/layouts/OrderDetail'
import BuyOrderDetail from './buyorderdetail/layouts/BuyOrderDetail'
import SellOrderDetail from './sellorderdetail/layouts/SellOrderDetail'
import Login from './user/layouts/login/Login'
import BuyOrders from './buyorders/layouts/BuyOrders'
import SellOrders from './sellorders/layouts/SellOrders'

import Help from './help/layouts/Help'
import HelpConfirmation from './help/layouts/HelpConfirmation'
import Payment from './activetrade/layouts/Payment'
import Release from './activetrade/layouts/Release'
import AllDone from './activetrade/layouts/AllDone'
import ActiveBuyOrder from './activetrade/layouts/ActiveBuyOrder'
import ActiveSellOrder from './activetrade/layouts/ActiveSellOrder'
import HTMLStyles from './css/HTMLStyles.js'
import Static from './staticPages/Master/Static'
import BuyTradeOrder from './buyTradeOrder/layouts/BuyTradeOrder'
import SellTradeOrder from './sellTradeOrder/layouts/SellTradeOrder'
import UserScreen from './userScreen/layouts/UserScreen'
import TermsOfService from './termsofservice/TermsOfService'
import ResetPassword from './signup/ResetPassword'
import ChatBox from './chat/containers/ChatBox'
//import Admin from './admin/components/Admin'
import Admin from './admin/layouts/Admin'

// Redux Store
import store from './store'
import * as firebase from 'firebase'
import * as _firebaseconfig from './../secrets/firebaseconfig'
// import * as actions from './buyorders/ui/BuyOrdersActions'
import * as useractions from './user/userActions'

// Config
// import truffleConfig from './../truffle-config.js'

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
        <Route path='dashboard' component={UserIsAuthenticated(Dashboard)} />
        <Route path='admin' component={UserIsAuthenticated(Admin)} />
        <Route path='signup' component={UserIsNotAuthenticated(SignUp)} />
        <Route path='login' component={UserIsNotAuthenticated(Login)} />
        <Route path='profile' component={UserIsAuthenticated(Profile)} />
        <Route path='sellorders' component={UserIsAuthenticated(BuyOrders)} />
        <Route path='buyorders' component={UserIsAuthenticated(SellOrders)} />
        <Route path='help' component={UserIsAuthenticated(Help)} />
        <Route path='help/confirmation' component={UserIsAuthenticated(HelpConfirmation)} />
        <Route path='posttrade' component={UserIsAuthenticated(PostTradeForm)} />
        <Route path='orderslist' component={UserIsAuthenticated(OrdersList)} />
        <Route path='user/:userUid' component={UserIsAuthenticated(UserScreen)} />
        <Route path='orderdetail/:address' component={UserIsAuthenticated(OrderDetail)} />
        <Route path='buyorderdetail/:orderId' component={UserIsAuthenticated(BuyOrderDetail)} />
        <Route path='buyTradeOrder/:orderId' component={UserIsAuthenticated(BuyTradeOrder)} />
        <Route path='sellTradeOrder/:orderId' component={UserIsAuthenticated(SellTradeOrder)} />
        <Route path='sellorderdetail/:orderId' component={UserIsAuthenticated(SellOrderDetail)} />
        <Route path='activebuyorder/:orderId' component={UserIsAuthenticated(ActiveBuyOrder)} />
        <Route path='activesellorder/:requestId' component={UserIsAuthenticated(ActiveSellOrder)} />
        <Route path='payment/:orderId' component={UserIsAuthenticated(Payment)} />
        <Route path='release/:orderId' component={UserIsAuthenticated(Release)} />
        <Route path='allDone/:orderId' component={UserIsAuthenticated(AllDone)} />
        <Route path='termsofservice' component={UserIsAuthenticated(TermsOfService)} />
        <Route path='password/reset' component={UserIsNotAuthenticated(ResetPassword)} />
        <Route path='chat' component={UserIsAuthenticated(ChatBox)} />
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
