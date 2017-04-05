import { connect } from 'react-redux'
import BuyOrderDetail from './BuyOrderDetail'
import { buyOrder } from './BuyOrderDetailActions'
import { createBuyOrderContract } from './BuyOrderDetailActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    buyOrderDetail: state.buyOrderDetail,
    params: ownProps.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (orderId) => {
      dispatch(buyOrder(orderId))
    },
    createBuyOrder: (amount, buyerAddress, web3) => {
      dispatch(createBuyOrderContract(amount, buyerAddress, web3));
    }
  }
}

const BuyOrderDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrderDetail)

export default BuyOrderDetailContainer
