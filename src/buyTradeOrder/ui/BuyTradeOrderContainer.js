import { connect } from 'react-redux'
import BuyTradeOrder from './BuyTradeOrder'
import { sellOrder, requestEtherFromSeller, availableBalance } from './BuyTradeOrderActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    sellOrderDetail: state.sellOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId) => {
      dispatch(sellOrder(orderId))
    },

    requestEther: (amount, uid, orderId, contractAddress, web3) => {
      dispatch(requestEtherFromSeller(amount, uid, orderId, contractAddress, web3));
    },

    getAvailableBalance: (contractAddress, web3) => {
      dispatch(availableBalance(contractAddress, web3))
    }
  }
}

const BuyTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeOrder)

export default BuyTradeOrderContainer
