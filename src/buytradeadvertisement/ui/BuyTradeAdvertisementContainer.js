import { connect } from 'react-redux'
import BuyTradeAdvertisement from './BuyTradeAdvertisement'
import {buyTradeAdvertisement, sellerCreatesPurchaseRequest, clearState} from './BuyTradeAdvertisementActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    buyer: state.buyer,
    buytradeadvertisements: state.buytradeadvertisements,
    buytradeadvertisement: state.buytradeadvertisement,
    buyTradeAdvertisementId: ownProps.buyTradeAdvertisementId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (buyTradeAdvertisements, buyTradeAdvertisementId, users) => {
      dispatch(buyTradeAdvertisement(buyTradeAdvertisements, buyTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(clearState())
    },
    createPurchaseRequest:(etherAmount, fiatAmount, etherPrice, buyTradeAdvertisementId, buyTradeAdvertisement, buyer, sellerAddress, seller)=>{
      dispatch(sellerCreatesPurchaseRequest(etherAmount, fiatAmount, etherPrice, buyTradeAdvertisementId, buyTradeAdvertisement, buyer, sellerAddress, seller))
    },
  }
}

const BuyTradeAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeAdvertisement)

export default BuyTradeAdvertisementContainer
