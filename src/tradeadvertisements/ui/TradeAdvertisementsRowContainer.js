import { connect } from 'react-redux'
import TradeAdvertisementsRow from './TradeAdvertisementsRow'
import { addEtherToContract, resetSendEtherState } from './TradeAdvertisementsRowActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeAdvertisementId: ownProps.tradeAdvertisementId,
    tradeType: ownProps.tradeType,
    tradeAdvertisement: ownProps.tradeAdvertisement,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ISSUE-231-12: orderId changes to tradeAdvertisementId
/*    onBeforeComponentLoads: (orderId, tradeType) => {
      // ISSUE-231-13: orderId changes to tradeAdvertisementId
      dispatch(getAd(orderId, tradeType))
    },*/

    addEther: (amount, tradeAdvertisementId, contractAddress, web3) => {
      // ISSUE-231-13tradeAdvertisementIdtradeAdvertisementId: orderId changes to tradeAdvertisementId
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
