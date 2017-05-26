import { connect } from 'react-redux'
import ActiveTrades from './ActiveTrades'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    activetrades: state.activetrades,
    user: state.user,
    users: state.users
  }
}


const ActiveTradesContainer = connect(
  mapStateToProps,
)(ActiveTrades)

export default ActiveTradesContainer
