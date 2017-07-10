import { connect } from 'react-redux'
import TradeAdvertisementsRow from './TradeAdvertisementsRow'
import * as actions from './TradeAdvertisementsRowActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeAdvertisementId: ownProps.tradeAdvertisementId,
    tradeType: ownProps.tradeType,
    tradeadvertisement: ownProps.tradeAdvertisement,
    sendEtherState: state.sendEtherState,
    ethorderbook: state.ethorderbook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEther: (amount, tradeAdvertisementId, contractAddress, web3, user, ethOrderBook) => {
      // TODO - create issue
      dispatch(actions.addEtherToContract(amount, tradeAdvertisementId, contractAddress, web3, user, ethOrderBook))
    },

    resetEtherState: () => {
      dispatch(actions.resetSendEtherState());
    }
  }
}

const TradeAdvertisementsRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeAdvertisementsRow)

export default TradeAdvertisementsRowContainer
