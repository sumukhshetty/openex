import { connect } from 'react-redux'
import ActiveTradesList from './ActiveTradesList'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    activetrades: state.activetrades,
    purchaserequests: state.purchaserequests,
    user: state.user,
    users: state.users,
    presence: state.presence
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      console.log("activetradessList.onBeforeComponentLoad")
      //dispatch(buyOrders(user))
    }
  }
}
*/
const ActiveTradesListContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(ActiveTradesList)

export default ActiveTradesListContainer
