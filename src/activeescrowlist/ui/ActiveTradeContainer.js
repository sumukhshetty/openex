import { connect } from 'react-redux'
import ActiveTrade from './ActiveTrade'
import { getActiveTrade } from './ActiveTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    orderId: ownProps.orderId,
    orderKey: ownProps.orderKey,
    activeTradeData: state.activeTradeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (orderId) => {

      dispatch(getActiveTrade(orderId))
    },
  }
}

const ActiveTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTrade)

export default ActiveTradeContainer
