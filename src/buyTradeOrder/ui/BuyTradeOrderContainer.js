import { connect } from 'react-redux'
import BuyTradeOrder from './BuyTradeOrder'
import { sellOrder, requestEtherFromSeller } from './BuyTradeOrderActions'


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

    requestEther: (amount, uid, orderId) => {
      dispatch(requestEtherFromSeller(amount, uid, orderId));
    }
  }
}

const BuyTradeOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradeOrder)

export default BuyTradeOrderContainer
