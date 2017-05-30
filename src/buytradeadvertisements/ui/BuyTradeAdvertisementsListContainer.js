import { connect } from 'react-redux'
import BuyTradeAdvertisementsList from './BuyTradeAdvertisementsList'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buytradeadvertisements: state.buytradeadvertisements,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    usersInfo: state.usersInfo
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("buytradeadvertisementsList.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}*/

const BuyTradeAdvertisementsListContainer = connect(
  mapStateToProps,
//  mapDispatchToProps
)(BuyTradeAdvertisementsList)

export default BuyTradeAdvertisementsListContainer
