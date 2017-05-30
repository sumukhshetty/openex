import { connect } from 'react-redux'
import TradeAdvertisements from './TradeAdvertisements'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeadvertisements: state.tradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
    buytradeadvertisements: state.buytradeadvertisements,
  }
}

const TradeAdvertisementsContainer = connect(
  mapStateToProps
)(TradeAdvertisements)

export default TradeAdvertisementsContainer
