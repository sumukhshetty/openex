import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './web3/web3Reducer'
import postTradeReducer from './posttrade/postTradeReducer'
import ordersListReducer from './orderslist/orderslistreducer'
import orderDetailReducer from './orderdetail/orderdetailreducer'
import buyOrderDetailReducer from './buyorderdetail/buyorderdetailreducer'
import sellOrderDetailReducer from './sellorderdetail/sellorderdetailreducer'
import buyOrderReducer from './buyorders/buyOrderReducer'
import sellOrderReducer from './sellorders/sellOrderReducer'
import activeEscrowListReducer from './activeescrowlist/activeescrowslistreducer'
import activeTradeReducer from './activeescrowlist/activetradereducer'
import adListReducer from './adlist/adlistreducer'


const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  postTrade: postTradeReducer,
  ordersList: ordersListReducer,
  orderDetail: orderDetailReducer,
  buyOrderDetail: buyOrderDetailReducer,
  sellOrderDetail: sellOrderDetailReducer,
  buyorders: buyOrderReducer,
  sellorders: sellOrderReducer,
  activeTrades: activeEscrowListReducer,
  activeAds: adListReducer,
  sellorders: sellOrderReducer,
  activeTradeData: activeTradeReducer
})

export default reducer
