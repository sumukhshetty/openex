import { connect } from 'react-redux'
import NewChatMessage from '../components/NewChatMessage'
import {createMessage} from '../actions/messages.js'
import {updateNewMessage} from '../actions/newMessage.js'

const mapStateToProps = (state) => {
  return {
    newMessage: state.newMessage,
    auth: state.chatAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (e) { dispatch(updateNewMessage(e.target.value)) },
    handleSubmit (e, content, uid) {
      e.preventDefault()
      dispatch(createMessage({ content, uid }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChatMessage)
