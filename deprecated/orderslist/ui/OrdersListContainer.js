import { connect } from 'react-redux'
import OrdersList from './OrdersList'
import { ordersList } from './OrdersListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    ordersList: state.ordersList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (web3) => {

      dispatch(ordersList(web3))
    }
  }
}

const OrdersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)

export default OrdersListContainer
