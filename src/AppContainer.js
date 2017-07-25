import { connect } from 'react-redux'
import App from './App'
import * as actions from './AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    loadinguserdata: state.loadinguserdata,
    presence: state.presence
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWeb3: (web3) => {
      dispatch(actions.setWeb3(web3))
    },
    getCountry: () => {
      dispatch(actions.getCountry())
    },
    getUsers: () => {
      dispatch(actions.getUsers())
    },
    getEtherPrice: () => {
      dispatch(actions.getEtherPrice())
    }

  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
