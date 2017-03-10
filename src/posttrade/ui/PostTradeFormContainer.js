import { connect } from 'react-redux'
import PostTradeForm from './PostTradeForm'
import { postTrade } from './PostTradeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostTradeFormSubmit: (tradeDetails, web3) => {
      event.preventDefault();

      dispatch(postTrade(tradeDetails, web3))
    }
  }
}

const PostTradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeForm)

export default PostTradeContainer