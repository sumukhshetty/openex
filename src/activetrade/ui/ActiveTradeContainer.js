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
    onBeforeComponentLoad: (purchaseRequests, purchaseRequestId, users, user) => {
      dispatch(actions.activeTrade(purchaseRequests, purchaseRequestId, users, user))
    },
    sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3) => {
      dispatch(actions.sellerConfirmsTrade(seller, buyer, purchaseRequest, purchaseRequestId, web3))
    },
    buyerConfirmsPayment: (buyer, seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerConfirmsPayment(buyer, seller, purchaseRequest, purchaseRequestId))
    },
    sellerReleasesEther: (seller, buyer,purchaseRequest, purchaseRequestId, web3) => {
      dispatch(actions.sellerReleasesEther(seller, buyer, purchaseRequest, purchaseRequestId, web3))
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
    arbiterReleasesToSeller: (seller, arbiter, purchaseRequest, purchaseRequestId, web3)=>{
      dispatch(actions.arbiterReleasesToSeller(seller, arbiter, purchaseRequest, purchaseRequestId, web3))
    },
    arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId, web3)=>{
      dispatch(actions.arbiterReleasesToBuyer(buyer, arbiter, purchaseRequest, purchaseRequestId, web3))
    },
    sellerRatesBuyer: (rating, purchaseRequestId, purchaseRequest) => {
      dispatch(actions.sellerRatesBuyer(rating, purchaseRequestId, purchaseRequest))
    },
    buyerRatesSeller: (rating, purchaseRequestId, purchaseRequest) =>{
      dispatch(actions.buyerRatesSeller(rating, purchaseRequestId, purchaseRequest))
    },
    tradePostProcessing: (user, purchaseRequest, purchaseRequestId, users) => {
      actions.tradePostProcessing(user, purchaseRequest, purchaseRequestId, users)
    },
    clearState: ()=>{
      dispatch(actions.clearState())
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    },
  }
}

const ActiveTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTrade)

export default ActiveTradeContainer
