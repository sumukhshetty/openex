import { connect } from 'react-redux'
import BrowseBuyAdvertisement from './BrowseBuyAdvertisement'
import * as actions from './BrowseBuyAdvertisementActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    buyer: state.buyer,
    buytradeadvertisements: state.buytradeadvertisements,
    buytradeadvertisement: state.buytradeadvertisement,
    buyTradeAdvertisementId: ownProps.buyTradeAdvertisementId,
    currency: state.currency,
    country: state.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (buyTradeAdvertisements, buyTradeAdvertisementId, users) => {
      dispatch(actions.buyTradeAdvertisement(buyTradeAdvertisements, buyTradeAdvertisementId, users))
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(actions.clearState())
    },
    createPurchaseRequest:(etherAmount, fiatAmount, etherPrice, buyTradeAdvertisementId, buyTradeAdvertisement, buyer, sellerAddress, seller)=>{
      console.log('createPurchaseRequest')
      //dispatch(actions.sellerCreatesPurchaseRequest(etherAmount, fiatAmount, etherPrice, buyTradeAdvertisementId, buyTradeAdvertisement, buyer, sellerAddress, seller))
    },
  }
}

const BrowseBuyAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseBuyAdvertisement)

export default BrowseBuyAdvertisementContainer
