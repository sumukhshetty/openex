import { connect } from 'react-redux'
import UserSellOrders from './UserSellOrders'
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

const UserSellOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSellOrders)

export default UserSellOrdersContainer
