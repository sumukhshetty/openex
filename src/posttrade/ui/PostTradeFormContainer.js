import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import * as actions from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    etherPrice: state.etherPrice,
    uid: ownProps.uid,
    sendEtherState: state.sendEtherState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostTradeFormSubmit: (tradeDetails, web3, state) => {
      //event.preventDefault();

      dispatch(actions.postTrade(tradeDetails, web3, state))
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
