import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import usersInfoReducer from './user/usersInfoReducer'
import web3Reducer from './web3/web3Reducer'
import etherPriceReducer from './etherprice/etherpricereducer'
// ISSUE-231-67: We don't really need to store the postatrade reducer its 
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
import tradeFeedbackReducer from './tradefeedback/tradeFeedbackReducer'
import userScreenReducer from './userScreen/userScreenReducer'
import enableNotificationsReducer from './enablenotifications/enablenotificationsreducer'
import buyTradeAdvertisementsReducer from './buytradeadvertisements/buytradeadvertisementsreducer'
import buyTradeAdvertisementReducer from './buytradeadvertisement/buytradeadvertisementreducer'
import usersReducer from './user/usersreducer'
import buyerReducer from './buytradeadvertisement/buyerreducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  //ISSUE-231-71: delete userInfo, it will be replaced by users, buyer, seller
  usersInfo: usersInfoReducer,
  users: usersReducer,
  web3: web3Reducer,
// ISSUE-231-67: We don't really need to store the postatrade reducer its 
  postTrade: postTradeReducer,
  ordersList: ordersListReducer,
  orderDetail: orderDetailReducer,
  buyOrderDetail: buyOrderDetailReducer,
// ISSUE-231-72: delete sellOrderDetail, replace with buyTradeAdvertisement
  sellOrderDetail: sellOrderDetailReducer,
  buytradeadvertisement: buyTradeAdvertisementReducer,
// ISSUE-231-71: delete buyorders, replace with buyTradeAdvertisementsReducer
  buyorders: buyOrderReducer,
  buytradeadvertisements: buyTradeAdvertisementsReducer,
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
  tradeFeedback: tradeFeedbackReducer,
  etherPrice: etherPriceReducer,
  userScreen: userScreenReducer,
  enableNotifications: enableNotificationsReducer,
  // ISSUE-231-76: add a buyer object to the store
  buyer: buyerReducer
})

export default reducer
