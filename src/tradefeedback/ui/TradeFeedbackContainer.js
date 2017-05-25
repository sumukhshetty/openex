import { connect } from 'react-redux'
import TradeFeedback from './TradeFeedback'
import { tradeFeedback, updateRating } from './TradeFeedbackActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeFeedback: state.tradeFeedback,
    purchaseRequestId: ownProps.purchaseRequestId,
    buyerId: ownProps.buyerId,
    sellerId: ownProps.sellerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user, purchaseRequestId) => {
      dispatch(tradeFeedback(user, purchaseRequestId))
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
