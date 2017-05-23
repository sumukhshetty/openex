import { connect } from 'react-redux'
import BuyTradeAdvertisement from './BuyTradeAdvertisement'
import {buyTradeAdvertisement, sellerCreatesPurchaseRequest, clearBuyer, clearBuyTradeAdvertisement} from './BuyTradeAdvertisementActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    buyer: state.buyer,
    buyTradeAdvertisements: state.buytradeadvertisements,
    buyTradeAdvertisement: state.buyTradeAdvertisement,
    buyTradeAdvertisementId: ownProps.buyTradeAdvertisementId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (buyTradeAdvertisements, buyTradeAdvertisementId, users) => {
      dispatch(buyTradeAdvertisement(buyTradeAdvertisement, buyTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(clearBuyTradeAdvertisement())
      dispatch(clearBuyer())
    }
    createPurchaseRequest:(user, buyTradeAdvertisement)=>{
      dispatch(sellerCreatesPurchaseRequest(user, buyTradeAdvertisement))
    },
    acceptOrder: (buyOrder, amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3) => {
      dispatch(createBuyOrderContract(buyOrder, amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3));
    },

    getAvailableBalance: (contractAddress, web3) => {
      dispatch(availableBalance(contractAddress, web3))
    }
  }
}

const SellTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeOrder)

export default SellTradeOrderContainer
