import { connect } from 'react-redux'
import Notifications from './Notifications'
//import * as actions from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    notifications: state.notifications
  }
}

/*const mapDispatchToProps = (dispatch) => {
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
}*/

const NotificationsContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(Notifications)

export default NotificationsContainer
