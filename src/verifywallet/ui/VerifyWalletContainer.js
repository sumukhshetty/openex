import { connect } from 'react-redux'
import VerifyWallet from './VerifyWallet'
import * as actions from './VerifyWalletActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    beforeComponentMounts: (web3) => {
      console.log('beforeComponentMounts')
      console.log(web3)
      console.log()
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
    }
  }
}

const VerifyWalletContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyWallet)

export default VerifyWalletContainer
