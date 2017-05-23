import { connect } from 'react-redux'
import SellTradeAdvertisement from './SellTradeAdvertisement'
//import { buyOrder, createBuyOrderContract, availableBalance, resetStatus } from './SellTradeOrderActions'
import sellTradeAdvertisement, clearSellTradeAdvertisement, clearSeller from './SellTradeAdvertisementActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    seller: state.seller,
    selltradeadvertisements: state.selltradeadvertisements,
    selltradeadvertisement: state.sellTradeAdvertisement,
    sellTradeAdvertisementId: ownProps.sellTradeAdvertisementId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (sellTradeAdvertisements, sellTradeAdvertisementId, users) => {
      dispatch(sellTradeAdvertisement(sellTradeAdvertisements, sellTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(clearSellTradeAdvertisement())
      dispatch(clearSeller())
    },
    createPurchaseRequest:(sellTradeAdvertisement, seller, buyer)=>{
      dispatch(buyerCreatesPurchaseRequest(sellTradeAdvertisement, seller, buyer))
    },
  }
}

const SellTradeAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeAdvertisement)

export default SellTradeAdvertisementContainer
