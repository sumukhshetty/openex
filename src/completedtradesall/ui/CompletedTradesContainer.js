import { connect } from 'react-redux'
import CompletedTrades from './CompletedTrades'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    completedtrades: state.completedtrades,
    purchaserequesets: state.purchaserequesets,
    countryCode: ownProps.countryCode
  }
}

const CompletedTradesContainer = connect(
  mapStateToProps
)(CompletedTrades)

export default CompletedTradesContainer
