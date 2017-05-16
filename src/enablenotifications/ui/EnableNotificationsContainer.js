import { connect } from 'react-redux'
import EnableNotifications from './EnableNotifications'
import { enableNotifications, dontShowAgain, getNotificationsSettings } from './EnableNotificationsActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
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
}

const EnableNotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnableNotifications)

export default EnableNotificationsContainer
