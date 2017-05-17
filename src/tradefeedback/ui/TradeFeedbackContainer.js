import { connect } from 'react-redux'
import TradeFeedback from './TradeFeedback'
import { tradeFeedback, updateRating } from './TradeFeedbackActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    tradeFeedback: state.tradeFeedback,
    orderId: ownProps.orderId,
    buyerId: ownProps.buyerId,
    sellerId: ownProps.sellerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (user, orderId) => {
      dispatch(tradeFeedback(user, orderId))
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
