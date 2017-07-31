import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import * as actions from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    etherPrice: state.etherPrice,
    uid: ownProps.uid,
    tradeadvertisements: state.tradeadvertisements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userCreatesBuyTradeAdvertisement: (tradeDetails, user) =>{
      dispatch(actions.userCreatesBuyTradeAdvertisement(tradeDetails, user))
    },
    onCreateSellTradeAdvertisementFormSubmit: (tradeDetails, user) => {
      //event.preventDefault();

      dispatch(actions.userCreatesSellTradeAdvertisement(tradeDetails, user))
    },
    onBuyEtherFormSubmit: (tradeDetails, state) => {
      event.preventDefault();
      dispatch(actions.buyEtherPostTrade(tradeDetails, state))
    }
  }
}

const PostTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeForm)

export default PostTradeContainer
