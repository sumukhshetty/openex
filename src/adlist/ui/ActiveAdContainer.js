import { connect } from 'react-redux'
import ActiveAd from './ActiveAd'
import { getAd, addEtherToContract, resetSendEtherState } from './ActiveAdActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    //ISSUE-231-11: orderId changes to tradeAdvertisementId
    orderId: ownProps.orderId,
    //ISSUE-231-12: orderKey is not used
    orderKey: ownProps.orderKey,
    tradeType: ownProps.tradeType,
    adData: state.adData,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ISSUE-231-12: orderId changes to tradeAdvertisementId
    onBeforeComponentLoads: (orderId, tradeType) => {
      // ISSUE-231-13: orderId changes to tradeAdvertisementId
      dispatch(getAd(orderId, tradeType))
    },

    addEther: (amount, orderId, contractAddress, web3) => {
      // ISSUE-231-12: orderId changes to tradeAdvertisementId
      dispatch(addEtherToContract(amount, orderId, contractAddress, web3))
    },

    resetEtherState: () => {
      dispatch(resetSendEtherState());
    }
  }
}

const ActiveAdContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveAd)

export default ActiveAdContainer
