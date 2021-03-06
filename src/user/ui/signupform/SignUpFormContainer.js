import { connect } from 'react-redux'
import { signUpUser, signUpUserCustomAuth } from './SignUpFormActions'
import SignUpFormCustomAuth from '../../../auth/signupBox/SignUpFormCustomAuth'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    country: state.country
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUpFormSubmit: (signUpInfo, web3) => {
      event.preventDefault()
      dispatch(signUpUser(signUpInfo, web3))
    },
    onSignUpFormCustomAuthSubmit: (signUpInfo, web3, country) => {
      event.preventDefault()
      dispatch(signUpUserCustomAuth(signUpInfo, web3, country))
    }
  }
}

const SignUpFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  SignUpFormCustomAuth
)

export default SignUpFormContainer
