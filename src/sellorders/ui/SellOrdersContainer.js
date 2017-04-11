import { connect } from 'react-redux'
import SellOrders from './SellOrders'
import { sellOrders } from './SellOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    sellorders: state.sellorders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {

      dispatch(sellOrders(user))
    }
  }
}

const SellOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellOrders)

export default SellOrdersContainer
