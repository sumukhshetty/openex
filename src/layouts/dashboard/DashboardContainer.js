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
    loadSellerInterfaceFactory: (web3, sellerInterfaceFactoryAddress) => {
      dispatch(actions.loadSellerInterfaceFactory(web3, sellerInterfaceFactoryAddress))
    },
    loadOrderDB: (web3, orderDBAddress) => {
      dispatch(actions.loadOrderDB(web3, orderDBAddress))
    },
    loadOrderBook: (web3, orderBookAddress) => {
      dispatch(actions.loadOrderBook(web3, orderBookAddress))
    },
    loadSellerInterface: (web3, user) => {
      dispatch(actions.loadSellerInterface(web3, user))
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
