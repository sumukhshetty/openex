import { connect } from 'react-redux'
import AccountWatcher from './AccountWatcher'
import { updateAccount } from '../AppActions'
import { checkBrowserWalletAddress } from '../layouts/dashboard/DashboardActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    account: state.account,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accountUpdated: (account) => {
      dispatch(updateAccount(account))
    },
    checkBrowserWalletAddress: (user, account) => {
      dispatch(checkBrowserWalletAddress(user, account))
    }
  }
}

const AccountWatcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWatcher)

export default AccountWatcherContainer
