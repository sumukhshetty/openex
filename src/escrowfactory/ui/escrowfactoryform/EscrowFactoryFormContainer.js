import { connect } from 'react-redux';
import EscrowFactoryForm from './EscrowFactoryForm'
import { escrowFactory } from './EscrowFactoryFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3:state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEscrowFactoryFormSubmit: (web3, factoryInputs) => {
      event.preventDefault();
      dispatch(escrowFactory(web3, factoryInputs))
    }
  }
}

const EscrowFactoryFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EscrowFactoryForm)

export default EscrowFactoryFormContainer
