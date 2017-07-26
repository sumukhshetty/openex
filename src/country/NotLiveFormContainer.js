import { connect } from 'react-redux'
// import SignUpForm from './SignUpForm'
import { signUpUser, signUpUserCustomAuth } from './NotLiveFormActions'
//import SignUpForm from './../../../signup/SignUpForm'
import NotLiveForm from './NotLiveForm'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    country: state.country
  }
}

const mapDispatchToProps = (dispatch) => {
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

const NotLiveFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotLiveForm)

export default NotLiveFormContainer
