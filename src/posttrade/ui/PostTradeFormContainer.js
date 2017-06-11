import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import * as actions from './PostTradeFormActions'
import { createETHOrderBook } from '../../web3/Web3InitActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    etherPrice: state.etherPrice,
    uid: ownProps.uid,
    sendEtherState: state.sendEtherState,
    orderbookfactory: state.orderbookfactory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userCreatesBuyTradeAdvertisement: (tradeDetails, web3, user) =>{
      dispatch(actions.userCreatesBuyTradeAdvertisement(tradeDetails, web3, user))
    },
    onCreateSellTradeAdvertisementFormSubmit: (tradeDetails, web3, user) => {
      //event.preventDefault();

      dispatch(actions.userCreatesSellTradeAdvertisement(tradeDetails, web3, user))
    },
    onBuyEtherFormSubmit: (tradeDetails, web3, state) => {
      event.preventDefault();
      dispatch(actions.buyEtherPostTrade(tradeDetails, web3, state))
    },
    resetEtherState: () => {
      dispatch(actions.resetEtherState());
    },
    createETHOrderBookContract: (web3, orderBookFactory, uid, country) => {
      dispatch(createETHOrderBook(web3, orderBookFactory, uid, country));
    }
  }
}

const PostTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeForm)

export default PostTradeContainer
