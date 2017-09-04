import { connect } from 'react-redux'
import Login from './Login'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence
  }
}

export default connect(mapStateToProps)(Login)
