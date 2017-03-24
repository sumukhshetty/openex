import { connect } from 'react-redux'
import UserBuyOrders from './UserBuyOrders'
import { buyOrders } from './BuyOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyorders: state.buyorders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {

      dispatch(buyOrders(user))
    }
  }
}

const UserBuyOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBuyOrders)

export default UserBuyOrdersContainer
