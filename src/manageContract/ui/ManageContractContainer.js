import { connect } from 'react-redux'
import ManageContract from './ManageContract'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    ethorderbook: state.ethorderbook,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEther:()=>{
      console.log("ui.ManageContractContainer.addEther")
      //dispatch(uploadKycFile(user, file))
    },
    withdraw:()=>{
      console.log("ui.ManageContractContainer.withdraw")
    },
    loadContractData: (ethorderbook)=>{
      console.log("ui.ManageContractContainer.loadContractData")
      console.log(ethorderbook)
    }
  }
}

const ManageContractContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageContract)

export default ManageContractContainer
