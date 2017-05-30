import { connect } from 'react-redux'
import UserScreen from './UserScreen'
import { userScreen, clearState } from './UserScreenActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    users: state.users,
    userScreen: state.userScreen,
    userScreenUid: ownProps.userScreenUid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user, users) => {

      dispatch(userScreen(user, users))
    },
    onBeforeComponentUnmount: ()=>{
      dispatch(clearState())
    }
  }
}

const UserScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen)

export default UserScreenContainer
