import { connect } from 'react-redux'
import SellOrderDetail from './SellOrderDetail'
import { sellOrder } from './SellOrderDetailActions'
import { clearSellOrderState } from './SellOrderDetailActions'
import { requestEtherFromSeller } from './SellOrderDetailActions'



const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    sellOrderDetail: state.sellOrderDetail,
    params: ownProps.params,
    uid: ownProps.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId, web3) => {
      dispatch(sellOrder(orderId, web3))
    },

    clearSellOrder: () => {
      dispatch(clearSellOrderState());
    },

    requestEther: (amount, uid, orderId) => {
      dispatch(requestEtherFromSeller(amount, uid, orderId));
    }
  }
}

const SellOrderDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellOrderDetail)

export default SellOrderDetailContainer
