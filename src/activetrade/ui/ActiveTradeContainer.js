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
    sellerInterface: state.sellerInterface,
    sellerInterfaceFactory: state.sellerInterfaceFactory,
    orderDB: state.orderDB,
    orderBook: state.orderBook,
    txhash: state.txhash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (purchaseRequests, purchaseRequestId, users, user) => {
      dispatch(actions.activeTrade(purchaseRequests, purchaseRequestId, users, user))
    },
    sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3, sellerInterface, orderDB, orderBook) => {
      dispatch(actions.sellerConfirmsTrade(seller, buyer, purchaseRequest, purchaseRequestId, web3, sellerInterface, orderDB, orderBook))
    },
    buyerConfirmsPayment: (buyer, seller, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerConfirmsPayment(buyer, seller, purchaseRequest, purchaseRequestId))
    },
    sellerReleasesEther: (seller, buyer,purchaseRequest, purchaseRequestId, web3, sellerInterface, orderBook) => {
      dispatch(actions.sellerReleasesEther(seller, buyer, purchaseRequest, purchaseRequestId, web3, sellerInterface, orderBook))
    },
    sellerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerCancelsTrade(seller, buyer, purchaseRequest, purchaseRequestId))
    },
    buyerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerCancelsTrade(seller, buyer, purchaseRequest, purchaseRequestId))
    },
    buyerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.buyerRaisesDispute(seller, buyer, purchaseRequest, purchaseRequestId))
    },
    sellerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => {
      dispatch(actions.sellerRaisesDispute(seller, buyer, purchaseRequest, purchaseRequestId))
    },
    arbiterReleasesToSeller: (seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3)=>{
      console.log('ActiveTradeContainer.arbiterReleasesToSeller')
      console.log(web3)
      console.log(web3.eth.coinbase)
      dispatch(actions.arbiterReleasesToSeller(seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3))
    },
    arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId, web3, sellerInterface)=>{
      dispatch(actions.arbiterReleasesToBuyer(buyer, arbiter, purchaseRequest, purchaseRequestId, web3, sellerInterface))
    },
    assignArbiter: (user, buyer, seller, purchaseRequest, purchaseRequestId, web3)=> {
      dispatch(actions.assignArbiter(user, buyer, seller, purchaseRequest, purchaseRequestId, web3))
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
    sellerAddsEther: (amount, uid, contractAddress, web3, sellerInterface, orderDB) => {
      console.log("ui.ActiveTradeContainer.sellerAddsEther")
      dispatch(actions.sellerAddsEther(amount, uid, contractAddress, web3,sellerInterface, orderDB))
    },
    createSellerInterfaceContract: (web3, sellerInterfaceFactory, user) => {
      console.log("ui.ActiveTradeContainer.createSellerInterfaceContract")
      dispatch(actions.sellerCreatesSellerInterface(web3, sellerInterfaceFactory, user))
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
