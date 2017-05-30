import { connect } from 'react-redux'
import SellTradeAdvertisements from './SellTradeAdvertisements'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    selltradeadvertisements: state.selltradeadvertisements,
    user: state.user
  }
}

const SellTradeAdvertisementsContainer = connect(
  mapStateToProps,
)(SellTradeAdvertisements)

export default SellTradeAdvertisementsContainer
