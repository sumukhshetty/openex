import { connect } from 'react-redux'
import BuyTradeOrder from './BuyTradeOrder'
import { sellOrder, requestEtherFromSeller, availableBalance, resetBalance, resetSellOrder, resetUserInfo } from './BuyTradeOrderActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrices: state.etherPrices,
    user: state.user,
    sellOrderDetail: state.sellOrderDetail,
    sellOrderContract: state.sellOrderContract,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId, web3) => {
      dispatch(sellOrder(orderId, web3))
    },

    requestEther: (amount, price, uid, sellerUid, buyerUsername, sellerUsername, orderId, contractAddress, availableBalance, web3) => {
      dispatch(requestEtherFromSeller(amount, price, uid, sellerUid, buyerUsername, sellerUsername, orderId, contractAddress, availableBalance, web3));
    },

    getAvailableBalance: (contractAddress, web3) => {
      dispatch(availableBalance(contractAddress, web3))
    },

    resetState: () => {
      dispatch(resetSellOrder())
      dispatch(resetBalance())
      dispatch(resetUserInfo())
    }
  }
}

const BuyTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeOrder)

export default BuyTradeOrderContainer
