import { connect } from 'react-redux'
import ActiveTrade from './ActiveTrade'
import * as actions from './ActiveTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    //orderBook: state.orderBook,
    user: state.user,
    users: state.users,
    purchaserequests: state.purchaserequests,
    buyer: state.buyer,
    seller: state.seller,
    activetrade: state.activetrade,
    sendEtherState: state.sendEtherState,
    cancelTradeState: state.cancelTradeState,
    purchaseRequestId: ownProps.purchaseRequestId,
    ethorderbook: state.ethorderbook,
    orderbookfactory: state.orderbookfactory,
    txhash: state.txhash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (purchaseRequests, purchaseRequestId, users, user) => {
      dispatch(actions.activeTrade(purchaseRequests, purchaseRequestId, users, user))
    },
    sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook) => {
      dispatch(actions.sellerConfirmsTrade(seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook))
    },
    buyerConfirmsPayment: (buyer, seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerConfirmsPayment(buyer, seller, purchaseRequest, purchaseRequestId))
    },
    sellerReleasesEther: (seller, buyer,purchaseRequest, purchaseRequestId, web3, ethOrderBook) => {
      dispatch(actions.sellerReleasesEther(seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook))
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
    arbiterReleasesToSeller: (seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3)=>{
      console.log('ActiveTradeContainer.arbiterReleasesToSeller')
      console.log(web3)
      console.log(web3.eth.coinbase)
      dispatch(actions.arbiterReleasesToSeller(seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3))
    },
    arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId, web3, ethOrderBook)=>{
      dispatch(actions.arbiterReleasesToBuyer(buyer, arbiter, purchaseRequest, purchaseRequestId, web3, ethOrderBook))
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
    sellerAddsEther: (amount, uid, contractAddress, web3) => {
      console.log("ui.ActiveTradeContainer.sellerAddsEther")
      dispatch(actions.sellerAddsEther(amount, uid, contractAddress, web3))
    },
    createOrderBookContract: (web3, orderBookFactory, user) => {
      console.log("ui.ActiveTradeContainer.createOrderBookContract")
      dispatch(actions.sellerCreatesETHOrderBook(web3, orderBookFactory, user))
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
