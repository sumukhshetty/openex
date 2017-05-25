import { connect } from 'react-redux'
import SellTradeAdvertisementsList from './SellTradeAdvertisementsList'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    selltradeadvertisements: state.selltradeadvertisements,
    user: state.user,
    users: state.users,
    etherPrice: state.etherPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("selltradeadvertisementsList.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}

const SellTradeAdvertisementsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeAdvertisementsList)

export default SellTradeAdvertisementsListContainer
