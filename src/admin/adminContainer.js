import { connect } from 'react-redux'
import Admin from './components/Admin'
import { getDisputedTrades } from './adminActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    orderId: ownProps.orderId,
    seller: ownProps.seller,
    buyer: ownProps.buyer,
    time: ownProps.time,
    amount: ownProps.amount,
    ether: ownProps.ether,
    id: ownProps.id,
    status: ownProps.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (orderId, tradeType) => {
      dispatch(getDisputedTrades(orderId, tradeType))
    }
  }
}

const DisputedTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)

export default DisputedTradeContainer
