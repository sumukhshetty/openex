import { connect } from 'react-redux'
import TradeAdvertisements from './TradeAdvertisements'
//import { getAds } from './TradeAdvertisementsActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeadvertisements: state.tradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
    buytradeadvertisements: state.buytradeadvertisements,
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    // ISSUE-231-6 just pass the user instead of state
    onBeforeComponentLoads: (web3, state) => {
      dispatch(getAds(state.user))
    },
  }

}*/

const TradeAdvertisementsContainer = connect(
  mapStateToProps
)(TradeAdvertisements)

export default TradeAdvertisementsContainer
