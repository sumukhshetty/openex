import { connect } from 'react-redux'
import ActiveBuyOrder from './ActiveBuyOrder'
import { buyOrder } from './ActiveBuyOrderActions'
import { createBuyOrderContract } from './ActiveBuyOrderActions'
import { clearBuyOrderState } from './ActiveBuyOrderActions'
import { fillEscrow } from './ActiveBuyOrderActions'



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
    sendEther: (orderId, web3) => {
      dispatch(fillEscrow(orderId, web3));
    }
  }
}

const ActiveBuyOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveBuyOrder)

export default ActiveBuyOrderContainer
