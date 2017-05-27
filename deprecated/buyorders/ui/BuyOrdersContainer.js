import { connect } from 'react-redux'
import BuyOrders from './BuyOrders'
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

const BuyOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrders)

export default BuyOrdersContainer
