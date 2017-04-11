import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './web3/web3Reducer'
import postTradeReducer from './posttrade/postTradeReducer'
import ordersListReducer from './orderslist/orderslistreducer'
import orderDetailReducer from './orderdetail/orderdetailreducer'
import buyOrderDetailReducer from './buyorderdetail/buyorderdetailreducer'
import buyOrderReducer from './buyorders/buyOrderReducer'
import activeEscrowListReducer from './activeescrowlist/activeescrowslistreducer'
import adListReducer from './adlist/adlistreducer'
import sellOrderReducer from './sellorders/sellOrderReducer'



const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  postTrade: postTradeReducer,
  ordersList: ordersListReducer,
  orderDetail: orderDetailReducer,
  buyOrderDetail: buyOrderDetailReducer,
  buyorders: buyOrderReducer,
  activeTrades: activeEscrowListReducer,
  activeAds: adListReducer,
  sellorders: sellOrderReducer,
})

export default reducer
