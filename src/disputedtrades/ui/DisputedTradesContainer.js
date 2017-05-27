import { connect } from 'react-redux'
import DisputedTrades from './DisputedTrades'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
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
const DisputedTradesContainer = connect(
  mapStateToProps
)(DisputedTrades)

export default DisputedTradesContainer
