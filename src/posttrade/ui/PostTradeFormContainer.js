import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import * as actions from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    etherPrice: state.etherPrice,
    uid: ownProps.uid,
    sendEtherState: state.sendEtherState,
    orderbookfactory: state.orderbookfactory,
    ethorderbook: state.ethorderbook,
    txhash: state.txhash,
    tradeadvertisements: state.tradeadvertisements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userCreatesBuyTradeAdvertisement: (tradeDetails, web3, user) =>{
      dispatch(actions.userCreatesBuyTradeAdvertisement(tradeDetails, web3, user))
    },
    onCreateSellTradeAdvertisementFormSubmit: (tradeDetails, web3, orderBookFactory, user) => {
      //event.preventDefault();

      dispatch(actions.userCreatesSellTradeAdvertisement(tradeDetails, web3, orderBookFactory, user))
    },
    onBuyEtherFormSubmit: (tradeDetails, web3, state) => {
      event.preventDefault();
      dispatch(actions.buyEtherPostTrade(tradeDetails, web3, state))
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    }
  }
}

const PostTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeForm)

export default PostTradeContainer
