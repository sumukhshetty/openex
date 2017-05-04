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
    sendEther: (buyOrder, contractAddress, orderId, sellerUid, web3) => {
      dispatch(actions.fillEscrow(buyOrder, contractAddress, orderId, sellerUid, web3))
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    },
    resetCancelState: () => {
      dispatch(actions.resetCancelState());
    },
    releaseEther: (buyOrder, contractAddress, orderId, web3, buyerUid, sellerUid) => {
      dispatch(actions.releaseEscrow(buyOrder, contractAddress, orderId, web3, buyerUid, sellerUid))
    },
    cancelTrade: (orderId, uid) => {
      dispatch(actions.cancelTrade(orderId, uid));
    },
    setCancelState: () => {
      dispatch(actions.setCancelState());
    },
    confirmPayment: (buyOrder, orderId) => {
      dispatch(actions.paymentConfirmed(buyOrder, orderId))
    }
  }
}

const ActiveBuyOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuyOrder)

export default ActiveBuyOrderContainer
