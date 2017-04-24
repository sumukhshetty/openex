import { connect } from 'react-redux'
import ChatBox from '../components/ChatBox'
import { getUser } from '../actions/auth'

const mapStateToProps = ({chatAuth, chatMessages}) => {
  return {
    chatAuth,
    chatMessages
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUser () { dispatch(getUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
