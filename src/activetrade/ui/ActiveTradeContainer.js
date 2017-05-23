// ISSUE-231-46: we're deleting this file since all purchaserequests will
// be mamanged by the activeTrade component

import { connect } from 'react-redux'
import ActiveTrade from './ActiveTrade'
import * as actions from './ActiveTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    users: state.users,
    purchaserequests: state.purchaserequests,
    buyer: state.buyer,
    seller: state.seller,
    activetrade: state.activetrade,
    sendEtherState: state.sendEtherState,
    cancelTradeState: state.cancelTradeState,
    purchaseRequestId: ownProps.purchaseRequestId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (purchaseRequests, purchaseRequestId, users) => {
      dispatch(actions.activeTrade(purchaseRequests, purchaseRequestId, users))
    },
    sellerConfirmsTrade: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerConfirmsTrade(purchaseRequest, seller))
    },
    buyerConfirmsPayment: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerConfirmsPayment(purchaseRequest, buyer))
    },
    sellerReleasesEther: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerReleasesEther(purchaseRequest, seller))
    },
    sellerCancelsTrade: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerCancelsTrade(purchaseRequest, seller))
    },
    buyerCancelsTrade: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerCancelsTrade(purchaseRequest, buyer))
    },
    buyerRaisesDispute: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerRaisesDispute(purchaseRequest, buyer))
    },
    sellerRaisesDispute: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerRaisesDispute(purchaseRequest, seller))
    },
    arbiterVotesForSeller: (seller, arbiter, purchaseRequest, purchaseRequestId)=>{
      dispatch(actions.arbiterVotesForSeller(seller, arbiter, purchaseRequest, purchaseRequestId))
    },
    arbiterVotesForBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId)=>{
      dispatch(actions.arbiterVotesForBuyer(buyer, arbiter, purchaseRequest, purchaseRequestId))
    },
    clearState: ()=>{
      dispatch(actions.clearState())
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

const ActiveTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTrade)

export default ActiveTradeContainer
