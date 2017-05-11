import { connect } from 'react-redux'
import UserScreen from './UserScreen'
import { userScreen } from './UserScreenActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    userScreen: state.userScreen,
    userScreenUid: ownProps.userScreenUid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user) => {

      dispatch(userScreen(user))
    }
  }
}

const UserScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen)

export default UserScreenContainer
