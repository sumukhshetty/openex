import { connect } from 'react-redux'
import DisputeTrade from '../generic-components/tradeFlow/DisputeTrade'

const mapStateToProps = (state, props) => {
  return {
    activeTrades: state.activeTrades,
    viewerRole: props.viewerRole,
    tradeId: props.tradeId,
    order: props.order,
    user: state.user
  }
}

const DisputeContainer = connect(
  mapStateToProps)(DisputeTrade)

export default DisputeContainer
