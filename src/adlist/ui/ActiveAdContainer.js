import { connect } from 'react-redux'
import ActiveAd from './ActiveAd'
import { getAd, addEtherToContract, resetSendEtherState } from './ActiveAdActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    orderId: ownProps.orderId,
    orderKey: ownProps.orderKey,
    tradeType: ownProps.tradeType,
    adData: state.adData,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (orderId, tradeType) => {

      dispatch(getAd(orderId, tradeType))
    },

    addEther: (amount, orderId, contractAddress, web3) => {
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
