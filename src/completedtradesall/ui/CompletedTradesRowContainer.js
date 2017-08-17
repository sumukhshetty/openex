import { connect } from 'react-redux'
import CompletedTradesRow from './CompletedTradesRow'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    purchaseRequestId: ownProps.purchaseRequestId,
    purchaserequests: state.purchaserequests,
    tradeType: ownProps.tradeType,
    presence: state.presence
  }
}

const CompletedTradeRowContainer = connect(
  mapStateToProps,
)(CompletedTradesRow)

export default CompletedTradeRowContainer
