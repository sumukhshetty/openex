import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import usersInfoReducer from './user/usersInfoReducer'
import web3Reducer from './web3/web3Reducer'
import etherPriceReducer from './etherprice/etherpricereducer'
import postTradeReducer from './posttrade/postTradeReducer'
import ordersListReducer from './orderslist/orderslistreducer'
import orderDetailReducer from './orderdetail/orderdetailreducer'
import buyOrderDetailReducer from './buyorderdetail/buyorderdetailreducer'
import sellOrderDetailReducer from './sellorderdetail/sellorderdetailreducer'
import buyOrderReducer from './buyorders/buyOrderReducer'
import sellOrderReducer from './sellorders/sellOrderReducer'
import activeEscrowListReducer from './activeescrowlist/activeescrowslistreducer'
import completedTradeListReducer from './completedtradeslist/completedtradelistreducer'
import activeTradeReducer from './activeescrowlist/activetradereducer'
import adReducer from './adlist/adreducer'
import adListReducer from './adlist/adlistreducer'
import etherSendReducer from './adlist/sendetherreducer'
import cancelTradeReducer from './activetrade/cancelTradeReducer'
import sellOrderContractReducer from './buyTradeOrder/sellOrderContractReducer'
import chatAuthReducer from './chat/reducers/auth'
import newMessageReducer from './chat/reducers/newMessage'
import ChatMessageReducer from './chat/reducers/messages'
import userScreenReducer from './userScreen/userScreenReducer'

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
  completedTrades: completedTradeListReducer,
  activeAds: adListReducer,
  activeTradeData: activeTradeReducer,
  adData: adReducer,
  sendEtherState: etherSendReducer,
  cancelTradeState: cancelTradeReducer,
  sellOrderContract: sellOrderContractReducer,
  chatAuth: chatAuthReducer,
  newMessage: newMessageReducer,
  chatMessages: ChatMessageReducer,
  etherPrices: etherPriceReducer,
  userScreen: userScreenReducer

})

export default reducer
