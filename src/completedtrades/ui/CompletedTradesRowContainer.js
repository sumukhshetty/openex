import { connect } from 'react-redux'
import CompletedTradesRow from './CompletedTradesRow'
import { getCompletedTrade } from './CompletedTradeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    purchaseRequestId: ownProps.purchaseRequestId,
    purchaserequests: state.purchaserequests,
    tradeType: ownProps.tradeType,
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (orderId, tradeType) => {

      dispatch(getCompletedTrade(orderId, tradeType))
    },
  }
}*/

const CompletedTradeRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTradesRow)

export default CompletedTradeRowContainer
