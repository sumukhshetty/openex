import { connect } from 'react-redux'
import ActiveBuyOrder from './ActiveBuyOrder'
import { buyOrder } from './ActiveBuyOrderActions'
import { clearBuyOrderState } from './ActiveBuyOrderActions'
import { fillEscrow } from './ActiveBuyOrderActions'
import { releaseEscrow } from './ActiveBuyOrderActions'
import { paymentConfirmed } from './ActiveBuyOrderActions'





const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyOrderDetail: state.buyOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId) => {
      dispatch(buyOrder(orderId))
    },
    clearBuyOrder: () => {
      dispatch(clearBuyOrderState());
    },
    sendEther: (contractAddress, orderId, web3) => {
      dispatch(fillEscrow(contractAddress, orderId, web3));
    },
    releaseEther: (contractAddress, orderId, web3, buyerUid, sellerUid) => {
      dispatch(releaseEscrow(contractAddress, orderId, web3, buyerUid, sellerUid))
    },
    confirmPayment: (orderId) => {
      dispatch(paymentConfirmed(orderId));
    }
  }
}

const ActiveBuyOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuyOrder)

export default ActiveBuyOrderContainer
