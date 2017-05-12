import { connect } from 'react-redux'
import NewChatMessage from '../components/NewChatMessage'
import {createMessage} from '../actions/messages.js'
import {updateNewMessage} from '../actions/newMessage.js'
import {clearNewMessage} from '../actions/newMessage.js'

const mapStateToProps = (state, props) => {
  return {
    newMessage: state.newMessage,
    auth: state.chatAuth,
    tradeId: props.tradeId
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleChange (e) {
      dispatch(updateNewMessage(e.target.value))
    },
    handleSubmit (e, content, uid, tradeId, download) {
      console.log(download)
      e.preventDefault()
      dispatch(createMessage({
        content,
        uid,
        tradeId: props.tradeId,
        download}))
      dispatch(clearNewMessage())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChatMessage)
