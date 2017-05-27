import { connect } from 'react-redux'
import TradeFeedback from './TradeFeedback'
import { tradeFeedback, updateRating } from './TradeFeedbackActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeFeedback: state.tradeFeedback,
    activetrade: ownProps.activetrade,
    purchaseRequestId: ownProps.purchaseRequestId,
    sellerRatesBuyer: ownProps.sellerRatesBuyer,
    buyerRatesSeller: ownProps.buyerRatesSeller,
    viewerRole: ownProps.viewerRole
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (activetrade, purchaseRequestId, viewerRole) => {
      dispatch(tradeFeedback(activetrade, purchaseRequestId, viewerRole))
    },
    updateRating: (rating) =>{
     dispatch(updateRating(rating)) 
    }
  }
}

const TradeFeedbackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeFeedback)

export default TradeFeedbackContainer
