import { connect } from 'react-redux'
import Home from './Home'
import HomeMain from './HomeMain'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence,
    country: state.country
  }
}


const HomeContainer = connect(
  mapStateToProps,
)(HomeMain)

export default HomeContainer
