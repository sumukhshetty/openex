import { connect } from 'react-redux'
import UserPresence from './UserPresence'
import { userPresence } from './UserPresenceActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackUserPresence: (uid) => {
      userPresence(uid)
    }
  }
}

const UserPresenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPresence)

export default UserPresenceContainer
