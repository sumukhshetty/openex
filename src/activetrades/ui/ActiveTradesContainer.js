import { connect } from 'react-redux'
import ActiveTrades from './ActiveTrades'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    activetrades: state.activetrades,
    user: state.user,
    users: state.users
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("activetrades.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}*/

const ActiveTradesContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(ActiveTrades)

export default ActiveTradesContainer
