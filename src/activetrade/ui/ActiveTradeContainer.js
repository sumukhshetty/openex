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
      dispatch(actions.sellerConfirmsTrade(seller, purchaseRequest, purchaseRequestId))
    },
    buyerConfirmsPayment: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerConfirmsPayment(buyer, purchaseRequest, purchaseRequestId))
    },
    sellerReleasesEther: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerReleasesEther(seller, purchaseRequest, purchaseRequestId))
    },
    sellerCancelsTrade: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerCancelsTrade(seller, purchaseRequest, purchaseRequestId))
    },
    buyerCancelsTrade: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerCancelsTrade(buyer, purchaseRequest, purchaseRequestId))
    },
    buyerRaisesDispute: (buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerRaisesDispute(buyer, purchaseRequest, purchaseRequestId))
    },
    sellerRaisesDispute: (seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerRaisesDispute(seller, purchaseRequest, purchaseRequestId))
    },
    arbiterReleasesToSeller: (seller, arbiter, purchaseRequest, purchaseRequestId)=>{
      dispatch(actions.arbiterReleasesToSeller(seller, arbiter, purchaseRequest, purchaseRequestId))
    },
    arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId)=>{
      dispatch(actions.arbiterReleasesToBuyer(buyer, arbiter, purchaseRequest, purchaseRequestId))
    },
    sellerRatesBuyer: (rating, purchaseRequestId, purchaseRequest) => {
      dispatch(actions.sellerRatesBuyer(rating, purchaseRequestId, purchaseRequest))
    },
    buyerRatesSeller: (rating, purchaseRequestId, purchaseRequest) =>{
      dispatch(actions.buyerRatesSeller(rating, purchaseRequestId, purchaseRequest))
    },
    clearState: ()=>{
      dispatch(actions.clearState())
    },
    clearBuyOrder: () => {
      dispatch(actions.clearBuyOrderState())
    },
/*    sendEther: (buyOrder, contractAddress, orderId, sellerUid, web3) => {
      dispatch(actions.fillEscrow(buyOrder, contractAddress, orderId, sellerUid, web3))
    },*/
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    },
/*    resetCancelState: () => {
      dispatch(actions.resetCancelState());
    },*/
/*    releaseEther: (buyOrder, contractAddress, orderId, web3, buyerUid, sellerUid) => {
      dispatch(actions.releaseEscrow(buyOrder, contractAddress, orderId, web3, buyerUid, sellerUid))
    },*/
/*    cancelTrade: (orderId, uid) => {
      dispatch(actions.cancelTrade(orderId, uid));
    },*/
/*    setCancelState: () => {
      dispatch(actions.setCancelState());
    },*/
/*    confirmPayment: (buyOrder, orderId) => {
      dispatch(actions.paymentConfirmed(buyOrder, orderId))
    }*/
  }
}

const ActiveTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTrade)

export default ActiveTradeContainer
