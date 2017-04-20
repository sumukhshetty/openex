import { connect } from 'react-redux'
import AdList from './AdList'
import { getAds } from './AdListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    activeAds: state.activeAds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoads: (web3, state) => {
      dispatch(getAds(state.user))
    },
  }
}

const AdListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdList)

export default AdListContainer
