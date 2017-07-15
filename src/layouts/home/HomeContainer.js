import { connect } from 'react-redux'
import Home from './Home'
import HomeMain from './HomeMain'
//import * as actions from './AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3
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
)(HomeMain)

export default HomeContainer
