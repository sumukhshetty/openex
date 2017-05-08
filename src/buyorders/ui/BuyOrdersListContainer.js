import { connect } from 'react-redux'
import BuyOrdersList from './BuyOrdersList'
import { buyOrders } from './BuyOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyorders: state.buyorders,
    user: state.user,
    usersInfo: state.usersInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {

      dispatch(buyOrders(user))
    }
  }
}

const BuyOrdersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrdersList)

export default BuyOrdersListContainer
