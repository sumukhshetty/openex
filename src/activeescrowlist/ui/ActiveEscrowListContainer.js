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
    onBeforeComponentLoads: (web3, state) => {
      event.preventDefault();

      dispatch(getActiveEscrows(state.user))
    },
  }
}

const ActiveEscrowListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveEscrowList)

export default ActiveEscrowListContainer