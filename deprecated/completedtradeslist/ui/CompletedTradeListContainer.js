import { connect } from 'react-redux'
import CompletedTradeList from './CompletedTradeList'
import { getCompletedTrades } from './CompletedTradeListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    completedTrades: state.completedTrades
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (web3, state) => {
      dispatch(getCompletedTrades(state.user))
    },
  }
}

const CompletedTradeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTradeList)

export default CompletedTradeListContainer
