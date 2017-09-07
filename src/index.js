import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import AppContainer from './AppContainer'
import HomeContainer from './homepage/container'
import DashboardContainer from './layouts/dashboard/DashboardContainer'
import WrongNetwork from './layouts/wrongnetwork/WrongNetwork'
import PostTradeForm from './posttrade/layouts/PostTradeForm'
import Help from './help/layouts/Help'
import HelpConfirmation from './help/layouts/HelpConfirmation'
import Support from './support/layouts/Support'
import HTMLStyles from './css/HTMLStyles.js'
import Static from './staticPages/Master/Static'
import UserScreen from './userScreen/layouts/UserScreen'
import Terms from './pages/Terms'
import About from './pages/About'
import How from './pages/How'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Admin from './admin/layouts/Admin'

import BuyTradeAdvertisement from './buytradeadvertisement/layouts/BuyTradeAdvertisement'
import BuyTradeAdvertisements from './buytradeadvertisements/layouts/BuyTradeAdvertisements'
import SellTradeAdvertisement from './selltradeadvertisement/layouts/SellTradeAdvertisement'
import SellTradeAdvertisements from './selltradeadvertisements/layouts/SellTradeAdvertisements'
import EditTradeAdvertisement from './edittradeadvertisement/layouts/EditTradeAdvertisement'

import BrowseAdvertisements from './browseadvertisements/layouts/BrowseAdvertisements'
import BrowseBuyAdvertisement from './browsebuyadvertisement/layouts/BrowseBuyAdvertisement'
import BrowseSellAdvertisement from './browseselladvertisement/layouts/BrowseSellAdvertisement'

import CompletedTradesAll from './completedtradesall/layouts/CompletedTradesAll'
import KycUpload from './kycupload/layouts/KycUpload'
import ProcessKyc from './processkyc/layouts/ProcessKyc'
import ActiveTrade from './activetrade/layouts/ActiveTrade'
// Redux Store
import store from './store'
import * as firebase from 'firebase'
import * as _firebaseconfig from './../secrets/firebaseconfig'
import * as useractions from './user/userActions'

import Raven from 'raven-js'

var ReactGA = require('react-ga')

ReactGA.initialize('UA-102946005-1')

// this if for internationalization, so that it's easy to create a chinese version of the site in the future
import languages from './langauges'
import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'
addLocaleData([...en, ...es, ...fr])
import { flattenMessages } from './util/flatI18n'

let locale = 'en-US'
// if we want to automatically set language based on browser preferences replace the line above with...
// (navigator.languages && navigator.languages[0]) ||
// navigator.language ||
// navigator.userLanguage ||
// 'en-US'

function logPageView() {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

//var raven
export const raven = Raven.config(
  'https://e84964259dc24e9e902198566c748cdb@sentry.io/178466'
).install()

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
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function(err) {
      console.log('Service worker registration failed, error:', err)
    })
}

export var FIREBASE_TIMESTAMP = firebase.database.ServerValue.TIMESTAMP

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={flattenMessages(languages[locale])}>
      <Router history={history} onUpdate={logPageView}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={HomeContainer} />
          <Route
            path="dashboard"
            component={UserIsAuthenticated(DashboardContainer)}
          />
          <Route path="how" component={UserIsNotAuthenticated(How)} />
          <Route path="guide" component={UserIsAuthenticated(How)} />
          <Route path="wrongnetwork" component={WrongNetwork} />
          <Route path="login" component={UserIsNotAuthenticated(Login)} />
          <Route path="signup" component={UserIsNotAuthenticated(Signup)} />
          <Route path="terms" component={UserIsNotAuthenticated(Terms)} />
          <Route path="about" component={UserIsNotAuthenticated(About)} />
          <Route path="how" component={UserIsNotAuthenticated(How)} />
          <Route path="admin" component={UserIsAuthenticated(Admin)} />
          <Route
            path="sellether"
            component={UserIsAuthenticated(BuyTradeAdvertisements)}
          />
          <Route
            path="buyether"
            component={UserIsAuthenticated(SellTradeAdvertisements)}
          />
          <Route path="help" component={UserIsAuthenticated(Help)} />
          <Route
            path="help/confirmation"
            component={UserIsAuthenticated(HelpConfirmation)}
          />
          <Route path="support" component={UserIsNotAuthenticated(Support)} />
          <Route
            path="posttrade"
            component={UserIsAuthenticated(PostTradeForm)}
          />
          <Route
            path="user/:userUid"
            component={UserIsAuthenticated(UserScreen)}
          />
          <Route
            path="browseuser/:userUid"
            component={UserIsNotAuthenticated(UserScreen)}
          />
          <Route
            path="selltradeadvertisement/:sellTradeAdvertisementId"
            component={UserIsAuthenticated(SellTradeAdvertisement)}
          />
          <Route
            path="buytradeadvertisement/:buyTradeAdvertisementId"
            component={UserIsAuthenticated(BuyTradeAdvertisement)}
          />
          <Route
            path="activetrade/:purchaseRequestId/:countryCode"
            component={UserIsAuthenticated(ActiveTrade)}
          />
          <Route
            path="edittradeadvertisement/:tradeAdvertisementType/:tradeAdvertisementId"
            component={UserIsAuthenticated(EditTradeAdvertisement)}
          />

          <Route path="kyc" component={UserIsAuthenticated(KycUpload)} />
          <Route
            path="processkyc/:country/:userUid"
            component={UserIsAuthenticated(ProcessKyc)}
          />

          <Route
            path="completedtrades"
            component={UserIsAuthenticated(CompletedTradesAll)}
          />
          <Route
            path="browseads"
            component={UserIsNotAuthenticated(BrowseAdvertisements)}
          />
          <Route
            path="browsebuyadvertisement/:buyTradeAdvertisementId"
            component={UserIsNotAuthenticated(BrowseBuyAdvertisement)}
          />
          <Route
            path="browseselladvertisement/:sellTradeAdvertisementId"
            component={UserIsNotAuthenticated(BrowseSellAdvertisement)}
          />
          <Route path="html" component={HTMLStyles} />
          <Route path="static" component={Static} />
        </Route>
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

// TODO add the ethprice listener here
setTimeout(function() {
  store.dispatch(useractions.checkLocalStorage())
  store.dispatch(useractions.startListeningUserAuth())
})
