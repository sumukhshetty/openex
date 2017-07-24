import { connect } from 'react-redux'
import BrowseSellAdvertisement from './BrowseSellAdvertisement'
import * as actions from './BrowseSellAdvertisementActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    seller: state.seller,
    selltradeadvertisements: state.selltradeadvertisements,
    selltradeadvertisement: state.selltradeadvertisement,
    sellTradeAdvertisementId: ownProps.sellTradeAdvertisementId,
    currency: state.currency,
    country: state.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (sellTradeAdvertisements, sellTradeAdvertisementId, users) => {
      dispatch(actions.sellTradeAdvertisement(sellTradeAdvertisements, sellTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(actions.clearState())
    },
    createPurchaseRequest:(etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyerAddress, buyer)=>{
      dispatch(actions.buyerCreatesPurchaseRequest(etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyerAddress, buyer))
    },
  }
}

const BrowseSellAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseSellAdvertisement)

export default BrowseSellAdvertisementContainer
