import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './web3/web3Reducer'
import orderBookReducer from './web3/orderBookReducer'
import etherPriceReducer from './etherprice/etherpricereducer'
import etherSendReducer from './sendether/sendetherreducer'
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
import purchaseRequestsReducer from './purchaserequests/purchaserequestsreducer'
import activeTradeReducer from './activetrade/activetradereducer'
import disputedTradesReducer from './disputedtrades/disputedtradesreducer'
import completedTradesReducer from './completedtrades/completedtradesreducer'
import tradeAdvertisementsReducer from './tradeadvertisements/tradeadvertisementsreducer'
import editTradeAdvertisementReducer from './edittradeadvertisement/edittradeadvertisementreducer'
import processKycReducer from './processkyc/processkycreducer'
import ethOrderBookReducer from './ethorderbook/ethorderbookreducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  users: usersReducer,
  web3: web3Reducer,
  orderBook: orderBookReducer,
  buytradeadvertisement: buyTradeAdvertisementReducer,
  buytradeadvertisements: buyTradeAdvertisementsReducer,
  selltradeadvertisements: sellTradeadvertisementsReducer,
  selltradeadvertisement: sellTradeadvertisementReducer,
  activetrades: activeTradesReducer,
  completedtrades: completedTradesReducer,
  sendEtherState: etherSendReducer,
  chatAuth: chatAuthReducer,
  newMessage: newMessageReducer,
  chatMessages: ChatMessageReducer,
  tradeFeedback: tradeFeedbackReducer,
  etherPrice: etherPriceReducer,
  userScreen: userScreenReducer,
  enableNotifications: enableNotificationsReducer,
  buyer: buyerReducer,
  seller: sellerReducer,
  purchaserequests: purchaseRequestsReducer,
  activetrade: activeTradeReducer,
  disputedtrades: disputedTradesReducer,
  tradeadvertisements: tradeAdvertisementsReducer,
  edittradeadvertisement: editTradeAdvertisementReducer,
  processkyc: processKycReducer,
  ethorderbook: ethOrderBookReducer
})

export default reducer
