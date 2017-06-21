import { connect } from 'react-redux'
import Home from './Home'
//import * as actions from './AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    setWeb3: (web3) => {
      dispatch(actions.setWeb3(web3))
    },

  }
}*/

const HomeContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(Home)

export default HomeContainer
