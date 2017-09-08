import { connect } from 'react-redux'
import AccountWatcher from './AccountWatcher'
import { updateAccount } from '../AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accountUpdated: (account) => {
      dispatch(updateAccount(account))
    }
  }
}

const AccountWatcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWatcher)

export default AccountWatcherContainer
