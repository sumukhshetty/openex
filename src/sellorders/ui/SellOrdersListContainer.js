import { connect } from 'react-redux'
import SellOrdersList from './SellOrdersList'
import { sellOrders } from './SellOrdersActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    sellorders: state.sellorders,
    usersInfo: state.usersInfo,
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

const SellOrdersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellOrdersList)

export default SellOrdersListContainer
