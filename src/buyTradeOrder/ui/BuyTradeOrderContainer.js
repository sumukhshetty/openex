import { connect } from 'react-redux'
import BuyTradeOrder from './BuyTradeOrder'
import * as actions from './BuyTradeOrderActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
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
      dispatch(actions.sellOrder(orderId, web3))
    },

    requestEther: (amount, price, order, buyerUid, buyerUsername, web3) => {
      dispatch(actions.requestEther(amount, price, order, buyerUid, buyerUsername, web3));
    },

    getAvailableBalance: (contractAddress, web3) => {
      dispatch(actions.getAvailableBalance(contractAddress, web3))
    },

    resetState: () => {
      dispatch(actions.resetSellOrder())
      dispatch(actions.resetBalance())
      dispatch(actions.resetUserInfo())
    }
  }
}

const BuyTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeOrder)

export default BuyTradeOrderContainer
