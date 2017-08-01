import { connect } from 'react-redux'
import TradeAdvertisementsRow from './TradeAdvertisementsRow'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeAdvertisementId: ownProps.tradeAdvertisementId,
    tradeType: ownProps.tradeType,
    tradeadvertisement: ownProps.tradeAdvertisement
  }
}

const TradeAdvertisementsRowContainer = connect(
  mapStateToProps
)(TradeAdvertisementsRow)

export default TradeAdvertisementsRowContainer
