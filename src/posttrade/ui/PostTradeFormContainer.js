import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import { postTrade } from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostTradeFormSubmit: (tradeDetails, web3, state) => {
      event.preventDefault();

      dispatch(postTrade(tradeDetails, web3, state))
    }
  }
}

const PostTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeForm)

export default PostTradeContainer