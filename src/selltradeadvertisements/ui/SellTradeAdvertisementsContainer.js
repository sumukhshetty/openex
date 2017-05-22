import { connect } from 'react-redux'
import SellTradeAdvertisements from './SellTradeAdvertisements'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    selltradeadvertisements: state.selltradeadvertisements,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("selltradeadvertisements.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}

const SellTradeAdvertisementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeAdvertisements)

export default SellTradeAdvertisementsContainer
