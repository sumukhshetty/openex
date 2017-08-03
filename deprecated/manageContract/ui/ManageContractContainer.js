import { connect } from 'react-redux'
import ManageContract from './ManageContract'
import * as actions from './ManageContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    sellerInterface: state.sellerInterface,
    web3: state.web3,
    managecontract: state.managecontract,
    sendEtherState: state.sendEtherState,
    orderDB: state.orderDB
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableBalance: (sellerInterface, orderDB, web3) => {
      dispatch(actions.getAvailableBalance(sellerInterface, orderDB, web3))
    },
    getContractBalance: (sellerInterface, web3) =>{
      dispatch(actions.getContractBalance(sellerInterface, web3))
    },
    addEther:(addAmount, contractAddress, web3, sellerInterface)=>{
      dispatch(actions.addEther(addAmount, contractAddress, web3, sellerInterface))
    },
    withdrawEther:(withdrawAmount, contractAddress, web3, sellerInterface)=>{
      dispatch(actions.withdrawEther(withdrawAmount, contractAddress, web3, sellerInterface))
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
