import { connect } from 'react-redux'
import ActiveEscrowList from './ActiveEscrowList'
import { getActiveEscrows } from './ActiveEscrowListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    activeTrades: state.activeTrades
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ISSUE-231-25: just pass the user and not the state
    onBeforeComponentLoads: (web3, state) => {
      dispatch(getActiveEscrows(state.user))
    },
  }
}

const ActiveEscrowListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveEscrowList)

export default ActiveEscrowListContainer
