import { connect } from 'react-redux'
import Kyc from './Kyc'


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}


const KcyContainer = connect(
  mapStateToProps,
)(Kyc)

export default KcyContainer
