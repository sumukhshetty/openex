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
import sellTradeadvertisementsReducer from './selltradeadvertisements/selltradeadvertisementsreducer'
import sellTradeadvertisementReducer from './selltradeadvertisement/selltradeadvertisementreducer'
import sellerReducer from './selltradeadvertisement/sellerreducer'
import activeTradesReducer from './activetrades/activetradesreducer'
import purchaseRequestsReducer from './purchaserequests/purchaseRequestsReducer'
import activeTradeReducer from './activetrade/activetradereducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  //ISSUE-231-71: delete userInfo, it will be replaced by users, buyer, seller
  usersInfo: usersInfoReducer,
  users: usersReducer,
  web3: web3Reducer,
// ISSUE-231-67: We don't really need to store the postatrade reducer its 
  postTrade: postTradeReducer,
// ISSUE-231-84: get rid of all orders
  ordersList: ordersListReducer,
  orderDetail: orderDetailReducer,
// ISSUE-231-84: the buyOrderDetail is being replaced with activetrade
  buyOrderDetail: buyOrderDetailReducer,
// ISSUE-231-72: delete sellOrderDetail, replace with buyTradeAdvertisement
  sellOrderDetail: sellOrderDetailReducer,
  buytradeadvertisement: buyTradeAdvertisementReducer,
// ISSUE-231-71: delete buyorders, replace with buyTradeAdvertisementsReducer
  buyorders: buyOrderReducer,
  buytradeadvertisements: buyTradeAdvertisementsReducer,
// ISSUE-231-73: delete sellorders, replace with sellTradeadvertisementsReducer
  sellorders: sellOrderReducer,
  selltradeadvertisements: sellTradeadvertisementsReducer,
  selltradeadvertisement: sellTradeadvertisementReducer,
// ISSUE-231-81: delete activeTrades, relpace with activetrades
  activeTrades: activeEscrowListReducer,
  activetrades: activeTradesReducer,
  completedTrades: completedTradeListReducer,
  activeAds: adListReducer,
// ISSUE-231-83: replace activeTradeData for activetrade
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
  buyer: buyerReducer,
  seller: sellerReducer,
  purchaserequests: purchaseRequestsReducer,
  activetrade: activeTradeReducer

})

export default reducer
