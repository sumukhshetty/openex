import { connect } from 'react-redux'
import ActiveBuyOrder from './ActiveBuyOrder'
import * as actions from './ActiveBuyOrderActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    buyOrderDetail: state.buyOrderDetail,
    sendEtherState: state.sendEtherState,
    cancelTradeState: state.cancelTradeState,
    params: ownProps.params,
    uid: ownProps.uid,
    tradeId: ownProps.params.orderId,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId) => {
      dispatch(actions.buyOrder(orderId))
    },
    clearBuyOrder: () => {
      dispatch(actions.clearBuyOrderState())
    },
    sendEther: (contractAddress, orderId, sellerUid, web3) => {
      dispatch(actions.fillEscrow(contractAddress, orderId, sellerUid, web3))
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    },
    resetCancelState: () => {
      dispatch(actions.resetCancelState());
    },
    releaseEther: (contractAddress, orderId, web3, buyerUid, sellerUid) => {
      dispatch(actions.releaseEscrow(contractAddress, orderId, web3, buyerUid, sellerUid))
    },
    confirmPayment: (orderId) => {
      dispatch(actions.paymentConfirmed(orderId))
    },
    cancelTrade: (orderId, uid) => {
      dispatch(actions.cancelTrade(orderId, uid));
    },
    cancelTradeEscrow: (orderId, contractAddress, uid, web3) => {
      dispatch(actions.cancelTradeEscrow(orderId, contractAddress, uid, web3));
    },
    setCancelState: () => {
      dispatch(actions.setCancelState());
    }
  }
}

const ActiveBuyOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuyOrder)

export default ActiveBuyOrderContainer
