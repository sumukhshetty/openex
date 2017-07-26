import { connect } from 'react-redux'
import NotLiveCountry from './NotLiveCountry'
import { logoutUser } from './NotLiveCountryActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();

      dispatch(logoutUser())
    }
  }
}

const NotLiveCountryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotLiveCountry)

export default NotLiveCountryContainer
