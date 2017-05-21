import { connect } from 'react-redux'
import BuyTradeAdvertisementsList from './BuyTradeAdvertisementsList'
import { buyOrders } from './BuyOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buytradeadvertisements: state.buytradeadvertisements,
    user: state.user,
    usersInfo: state.usersInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("buytradeadvertisementsList.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}

const BuyTradeAdvertisementsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeAdvertisementsList)

export default BuyTradeAdvertisementsListContainer
