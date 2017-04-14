import { connect } from 'react-redux'
import ActiveSellOrder from './ActiveSellOrder'
import { sellOrder, confirmTradeAction } from './ActiveSellOrderActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    sellOrderDetail: state.sellOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId) => {
      dispatch(sellOrder(orderId))
    },
    confirmTrade: (contractAddress, buyerAddress, orderId, requestId, amount, web3) => {
      dispatch(confirmTradeAction(contractAddress, buyerAddress, orderId, requestId, amount, web3));
    }
  }
}

const ActiveSellOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveSellOrder)

export default ActiveSellOrderContainer
