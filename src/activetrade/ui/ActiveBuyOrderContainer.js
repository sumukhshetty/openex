import { connect } from 'react-redux'
import ActiveBuyOrder from './ActiveBuyOrder'
import * as actions from './ActiveBuyOrderActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyOrderDetail: state.buyOrderDetail,
    sendEtherState: state.sendEtherState,
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
    releaseEther: (contractAddress, orderId, web3, buyerUid, sellerUid) => {
      dispatch(actions.releaseEscrow(contractAddress, orderId, web3, buyerUid, sellerUid))
    },
    confirmPayment: (orderId) => {
      dispatch(actions.paymentConfirmed(orderId))
    }
  }
}

const ActiveBuyOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuyOrder)

export default ActiveBuyOrderContainer
