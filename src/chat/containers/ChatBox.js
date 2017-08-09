import { connect } from 'react-redux'
import ChatBox from '../components/ChatBox'
import { getUser } from '../actions/auth'
import { startListeningForMessages } from '../actions/messages.js'
import { clearMessagesFromState } from '../actions/messages.js'

const mapStateToProps = (state, props) => {
  console.log('mapSTate2', props.chatMessages)
  return {
    chatAuth: state.chatAuth,
    chatMessages: state.chatMessages,
    tradeId: props.tradeId,
    buyerId: props.buyerId,
    sellerId: props.sellerId,
    purchaseRequest: props.purchaseRequest
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUser(tradeId, buyerId, sellerId) {
      dispatch(getUser(tradeId, buyerId, sellerId))
    },
    startListeningForMessages(tradeId) {
      dispatch(startListeningForMessages(tradeId))
    },
    clearMessagesFromState() {
      dispatch(clearMessagesFromState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
