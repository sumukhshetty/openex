import { connect } from 'react-redux'
import Signup from './Signup'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence
  }
}

export default connect(mapStateToProps)(Signup)
