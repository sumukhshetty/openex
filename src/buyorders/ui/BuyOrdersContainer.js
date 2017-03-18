import { connect } from 'react-redux'
import BuyOrders from './BuyOrders'
import { buyOrders } from './BuyOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyOrders: state.buyOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (web3) => {

      dispatch(buyOrders(web3))
    }
  }
}

const BuyOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrders)

export default BuyOrdersContainer
