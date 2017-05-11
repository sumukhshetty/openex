import { connect } from 'react-redux'
import Dispute from '../generic-components/tradeFlow/DisputeTrade'

const mapStateToProps = (state, props) => {
  return {
    activeTrades: state.activeTrades,
    viewerRole: props.viewerRole,
    tradeId: props.tradeId,
    order: props.order
  }
}

const DisputeContainer = connect(
  mapStateToProps)(Dispute)

export default DisputeContainer
