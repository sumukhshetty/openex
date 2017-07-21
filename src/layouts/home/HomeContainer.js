import { connect } from 'react-redux'
import Home from './Home'
import HomeMain from './HomeMain'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3
  }
}


const HomeContainer = connect(
  mapStateToProps,
)(HomeMain)

export default HomeContainer
