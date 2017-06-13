import { connect } from 'react-redux'
import VerifyWallet from './VerifyWallet'
import * as actions from './VerifyWalletActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    ethorderbook: state.ethorderbook,
    orderbookfactory: state.orderbookfactory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    beforeComponentMounts: (web3) => {
      try{
        if (web3.locked){
          dispatch(actions.verifyWallet(false))
        }
      } catch(error){
        dispatch(actions.verifyWallet(false))
      }
    },
    verifyWallet: (result) => {
      dispatch(actions.verifyWallet(result))
    },
    loadETHOrderBook: (web3, orderBookAddress) => {
      dispatch(actions.loadUserOrderBook(web3, orderBookAddress))
    },
    loadOrderBookFactory: (web3, orderBookFactoryAddress) => {
      dispatch(actions.loadOrderBookFactory(web3, orderBookFactoryAddress))
    },
    wrongNetwork: (value) => {
      dispatch(actions.wrongNetwork(value))
    }
  }
}

const VerifyWalletContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyWallet)

export default VerifyWalletContainer
