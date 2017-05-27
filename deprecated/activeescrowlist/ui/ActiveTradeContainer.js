import { connect } from 'react-redux'
import ActiveTrade from './ActiveTrade'
import { getActiveTrade } from './ActiveTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    // ISSUE-231-28: get rid of web3, orderKey, orderId should be changed to purchaseRequestId
    web3: state.web3,
    user: state.user,
    orderId: ownProps.orderId,
    orderKey: ownProps.orderKey,
    tradeType: ownProps.tradeType,
    activeTradeData: state.activeTradeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ISSUE-231-29: orderId should be changed to purchaseRequestId
    onBeforeComponentLoads: (orderId, tradeType) => {

      dispatch(getActiveTrade(orderId, tradeType))
    },
  }
}

const ActiveTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTrade)

export default ActiveTradeContainer
