import { connect } from 'react-redux'
import ManageContract from './ManageContract'
import * as actions from './ManageContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    ethorderbook: state.ethorderbook,
    web3: state.web3,
    managecontract: state.managecontract,
    sendEtherState: state.sendEtherState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableBalance: (ethorderbook, web3) => {
      dispatch(actions.getAvailableBalance(ethorderbook, web3))
    },
    getContractBalance: (ethorderbook, web3) =>{
      dispatch(actions.getContractBalance(ethorderbook, web3))
    },
    addEther:(addAmount, contractAddress, web3, ethOrderBook)=>{
      dispatch(actions.addEther(addAmount, contractAddress, web3, ethOrderBook))
    },
    withdrawEther:(withdrawAmount, contractAddress, web3, ethOrderBook)=>{
      dispatch(actions.withdrawEther(withdrawAmount, contractAddress, web3, ethOrderBook))
    },
    resetEtherState: () => {
      dispatch(actions.resetSendEtherState());
    }
  }
}

const ManageContractContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageContract)

export default ManageContractContainer
