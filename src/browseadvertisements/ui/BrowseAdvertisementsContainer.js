import { connect } from 'react-redux'
import BrowseAdvertisements from './BrowseAdvertisements'

const mapStateToProps = (state, ownProps) => {
  return {
    buytradeadvertisements: state.buytradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
    users: state.users,
    etherPrice: state.etherPrice,
    presence: state.presence
  }
}


const BrowseAdvertisementsContainer = connect(
  mapStateToProps,
)(BrowseAdvertisements)

export default BrowseAdvertisementsContainer
