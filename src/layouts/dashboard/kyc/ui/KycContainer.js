import { connect } from 'react-redux'
import Kyc from './Kyc'
import * as actions from './KycActions'


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPhoneNumber: (phoneNumber, country, uid) => {
      dispatch(actions.verifyPhoneNumber(phoneNumber, country, uid))
    },
    verifyOTP: (phoneNumber, country, token, uid) => {
      dispatch(actions.verifyOTP(phoneNumber, country, token, uid))
    }
  }
}


const KcyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Kyc)

export default KcyContainer
