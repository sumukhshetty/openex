import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App';
import Home from './layouts/home/Home';
import Dashboard from './layouts/dashboard/Dashboard';
import SignUp from './user/layouts/signup/SignUp';
import Profile from './user/layouts/profile/Profile';
import EscrowFactory from './escrowfactory/layouts/EscrowFactory'
import PostTradeForm from './posttrade/layouts/PostTradeForm'
import OrdersList from './orderslist/layouts/OrdersList'
import OrderDetail from './orderdetail/layouts/OrderDetail'


// Redux Store
import store from './store';

// Config
//import truffleConfig from './../truffle-config.js'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="escrowfactory" component={UserIsAuthenticated(EscrowFactory)} />
          <Route path="posttrade" component={UserIsAuthenticated(PostTradeForm)} />
          <Route path="orderslist" component={UserIsAuthenticated(OrdersList)} />
          <Route path="orderdetail/:address" component={UserIsAuthenticated(OrderDetail)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
