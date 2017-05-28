import { connect } from 'react-redux'
import Dashboard from './Dashboard'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
  }
}

const DashboardContainer = connect(
  mapStateToProps,
)(Dashboard)

export default DashboardContainer
