import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { loginUser } from './LoginFormActions'
import * as actions from '../../../header/HomeNavActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onLoginFormSubmit: (loginInfo, web3) => {
    //   event.preventDefault()
    //   dispatch(loginUser(loginInfo, web3))
    // },
    login: web3 => {
      dispatch(actions.login(web3))
    }
  }
}

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  LoginForm
)

export default LoginFormContainer
