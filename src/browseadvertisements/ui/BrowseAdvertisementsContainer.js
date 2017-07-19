import { connect } from 'react-redux'
import BrowseAdvertisements from './BrowseAdvertisements'
//import { enableNotifications, dontShowAgain, getNotificationsSettings } from './EnableNotificationsActions'


const mapStateToProps = (state, ownProps) => {
  return {
    buytradeadvertisements: state.buytradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
    users: state.users,
    etherPrice: state.etherPrice,
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {
      dispatch(getNotificationsSettings(user))
    },

    givePermission: (uid) => {
      dispatch(enableNotifications(uid));
    },

    dontShowAgain: (uid) => {
      dispatch(dontShowAgain(uid))
    }
  }
}*/

const BrowseAdvertisementsContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(BrowseAdvertisements)

export default BrowseAdvertisementsContainer
