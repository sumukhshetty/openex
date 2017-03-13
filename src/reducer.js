import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './web3/web3Reducer'
import postTradeReducer from './posttrade/postTradeReducer'
import ordersListReducer from './orderslist/orderslistreducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  postTrade: postTradeReducer,
  ordersList: ordersListReducer
})

export default reducer
