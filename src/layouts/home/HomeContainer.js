import { connect } from 'react-redux'
import HomeMain from './HomeMain'

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence
  }
}


const HomeContainer = connect(
  mapStateToProps,
)(HomeMain)

export default HomeContainer
