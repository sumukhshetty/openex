import { connect } from 'react-redux'
import EtherPrice from './EtherPrice'
import { getEtherPrice } from './EtherPriceActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEtherPriceComponentLoad: (uid) => {
      dispatch(getEtherPrice(uid))
    }
  }
}

const EtherPriceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EtherPrice)

export default EtherPriceContainer
