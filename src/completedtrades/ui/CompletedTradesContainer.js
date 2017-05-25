import { connect } from 'react-redux'
import CompletedTrades from './CompletedTrades'
import { getCompletedTrades } from './CompletedTradesActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    completedtrades: state.completedtrades,
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (orderId, tradeType) => {

      dispatch(getCompletedTrades(orderId, tradeType))
    },
  }
}
*/
const CompletedTradesContainer = connect(
  mapStateToProps
)(CompletedTrades)

export default CompletedTradesContainer
