import { connect } from 'react-redux'
import SellTradeOrder from './SellTradeOrder'
import { buyOrder, createBuyOrderContract, availableBalance, resetStatus } from './SellTradeOrderActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrices: state.etherPrices,
    user: state.user,
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

    acceptOrder: (amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3) => {
      dispatch(createBuyOrderContract(amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3));
    },

    getAvailableBalance: (contractAddress, web3) => {
      dispatch(availableBalance(contractAddress, web3))
    }
  }
}

const SellTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradeOrder)

export default SellTradeOrderContainer
