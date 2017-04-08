import { connect } from 'react-redux'
import BuyOrderDetail from './BuyOrderDetail'
import { buyOrder } from './BuyOrderDetailActions'
import { createBuyOrderContract } from './BuyOrderDetailActions'
import { clearBuyOrderState } from './BuyOrderDetailActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
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
    clearBuyOrder: () => {
      dispatch(clearBuyOrderState());
    },
    createBuyOrder: (amount, buyerAddress, orderId, uid, buyerUid, web3) => {
      dispatch(createBuyOrderContract(amount, buyerAddress, orderId, uid, buyerUid, web3));
    }
  }
}

const BuyOrderDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrderDetail)

export default BuyOrderDetailContainer
