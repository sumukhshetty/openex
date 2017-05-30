import { connect } from 'react-redux'
import SellTradeAdvertisement from './SellTradeAdvertisement'
//import { buyOrder, createBuyOrderContract, availableBalance, resetStatus } from './SellTradeOrderActions'
import {sellTradeAdvertisement, clearState, buyerCreatesPurchaseRequest} from './SellTradeAdvertisementActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    seller: state.seller,
    selltradeadvertisements: state.selltradeadvertisements,
    selltradeadvertisement: state.selltradeadvertisement,
    sellTradeAdvertisementId: ownProps.sellTradeAdvertisementId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (sellTradeAdvertisements, sellTradeAdvertisementId, users) => {
      dispatch(sellTradeAdvertisement(sellTradeAdvertisements, sellTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(clearState())
    },
    createPurchaseRequest:(etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyerAddress, buyer)=>{
      dispatch(buyerCreatesPurchaseRequest(etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyerAddress, buyer))
    },
  }
}

const SellTradeAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeAdvertisement)

export default SellTradeAdvertisementContainer
