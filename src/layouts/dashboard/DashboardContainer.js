import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import * as actions from './DashboardActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    users: state.users,
    purchaserequests: state.purchaserequests,
    buytradeadvertisements: state.buytradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrderBookFactory: (web3, orderBookFactoryAddress) => {
      dispatch(actions.loadOrderBookFactory(web3, orderBookFactoryAddress))
    },
    loadETHOrderBook: (web3, user) => {
      dispatch(actions.loadETHOrderBook(web3, user))
    },
    checkBrowserWalletAddress: (web3, user) => {
      dispatch(actions.checkBrowserWalletAddress(web3, user))
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
