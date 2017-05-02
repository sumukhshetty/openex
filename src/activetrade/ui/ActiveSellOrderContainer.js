import { connect } from 'react-redux'
import ActiveSellOrder from './ActiveSellOrder'
import * as actions from './ActiveSellOrderActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    sellOrderDetail: state.sellOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (requestId) => {
      dispatch(actions.sellOrder(requestId))
    },
    confirmTrade: (contractAddress, buyerAddress, requestId, amount, web3) => {
      dispatch(actions.confirmTrade(contractAddress, buyerAddress, requestId, amount, web3));
    },
    confirmPayment: (requestId) => {
      dispatch(actions.confirmPayment(requestId));
    },
    releaseEther: (contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3) => {
      dispatch(actions.releaseEther(contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3));
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState())
    }
  }
}

const ActiveSellOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveSellOrder)

export default ActiveSellOrderContainer
