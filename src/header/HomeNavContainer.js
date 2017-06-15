import { connect } from 'react-redux'
import HomeNav from './HomeNav'
import * as actions from './HomeNavActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (web3) => {
      dispatch(actions.login(web3))
    },
  }
}

const CompletedTradesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeNav)

export default CompletedTradesContainer
