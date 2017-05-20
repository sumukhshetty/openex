// ISSUE-231-54: change the name of the file from ActiveSellOrderContainer to ActiveTradeContainer
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
    {/* ISSUE-231-56: change actions.sellOrder to action.purchaseRequest*/}
      dispatch(actions.sellOrder(requestId))
    },
    {/* ISSUE-231-55: add a onComponentWillDismount and dispatch the store that the active trade is null*/}

  {/* ISSUE-231-57: change sellOrder to purchaseRequest*/}
    confirmTrade: (sellOrder, contractAddress, buyerAddress, requestId, amount, web3) => {
      dispatch(actions.confirmTrade(sellOrder, contractAddress, buyerAddress, requestId, amount, web3));
    },
  {/* ISSUE-231-58: change sellOrder to purchaseRequest*/}
    confirmPayment: (sellOrder, requestId) => {
      dispatch(actions.confirmPayment(sellOrder, requestId));
    },
  {/* ISSUE-231-59: change sellOrder to purchaseRequest*/}
    releaseEther: (sellOrder, contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3) => {
      dispatch(actions.releaseEther(sellOrder, contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3));
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
