import { connect } from 'react-redux'
import TradeAdvertisementsRow from './TradeAdvertisementsRow'
import { addEtherToContract, resetSendEtherState } from './TradeAdvertisementsRowActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeAdvertisementId: ownProps.tradeAdvertisementId,
    tradeType: ownProps.tradeType,
    tradeadvertisement: ownProps.tradeAdvertisement,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    addEther: (amount, tradeAdvertisementId, contractAddress, web3) => {
      // TODO - create issue
      dispatch(addEtherToContract(amount, tradeAdvertisementId, contractAddress, web3))
    },

    resetEtherState: () => {
      dispatch(resetSendEtherState());
    }
  }
}

const TradeAdvertisementsRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeAdvertisementsRow)

export default TradeAdvertisementsRowContainer
