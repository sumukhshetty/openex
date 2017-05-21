import { connect } from 'react-redux'
import BuyTradeAdvertisements from './BuyTradeAdvertisements'
import { buyOrders } from './BuyOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buytradeadvertisements: state.buytradeadvertisements,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("buytradeadvertisements.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}

const BuyTradeAdvertisementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeAdvertisements)

export default BuyTradeAdvertisementsContainer
