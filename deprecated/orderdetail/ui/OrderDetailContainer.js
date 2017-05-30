import { connect } from 'react-redux'
import OrderDetail from './OrderDetail'
import { orderDetail } from './OrderDetailActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    orderDetail: state.orderDetail,
    params: ownProps.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (web3, address) => {

      dispatch(orderDetail(web3, address))
    }
  }
}

const OrderDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail)

export default OrderDetailContainer
