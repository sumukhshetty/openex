import { connect } from 'react-redux'
import CompletedTrade from './CompletedTrade'
import { getCompletedTrade } from './CompletedTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
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
    onBeforeComponentLoads: (orderId, tradeType) => {

      dispatch(getCompletedTrade(orderId, tradeType))
    },
  }
}

const CompletedTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTrade)

export default CompletedTradeContainer
