import { connect } from 'react-redux'
import EtherPrice from './EtherPrice'
import { getEtherPrice } from './EtherPriceActions'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEtherPriceComponentLoad: (toSymbols) => {
      dispatch(getEtherPrice(toSymbols))
    }
  }
}

const EtherPriceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EtherPrice)

export default EtherPriceContainer
