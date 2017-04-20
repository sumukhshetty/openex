import { connect } from 'react-redux'
import ActiveSellOrder from './ActiveSellOrder'
import { sellOrder, confirmTradeAction, confirmPaymentAction, releaseEtherAction } from './ActiveSellOrderActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    sellOrderDetail: state.sellOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (requestId) => {
      dispatch(sellOrder(requestId))
    },
    confirmTrade: (contractAddress, buyerAddress, requestId, amount, web3) => {
      dispatch(confirmTradeAction(contractAddress, buyerAddress, requestId, amount, web3));
    },
    confirmPayment: (requestId) => {
      dispatch(confirmPaymentAction(requestId));
    },
    releaseEther: (contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3) => {
      dispatch(releaseEtherAction(contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3));
    }
  }
}

const ActiveSellOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveSellOrder)

export default ActiveSellOrderContainer
