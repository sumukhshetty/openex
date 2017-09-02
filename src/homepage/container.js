import { connect } from 'react-redux'
import Home from './Home'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence
  }
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
