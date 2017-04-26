import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import usersInfoReducer from './user/usersInfoReducer'
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
import adReducer from './adlist/adreducer'
import adListReducer from './adlist/adlistreducer'
import etherSendReducer from './adlist/sendetherreducer'
import sellOrderContractReducer from './buyTradeOrder/sellOrderContractReducer'


const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  usersInfo: usersInfoReducer,
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
  activeTradeData: activeTradeReducer,
  adData: adReducer,
  sendEtherState: etherSendReducer,
  sellOrderContract: sellOrderContractReducer
})

export default reducer
