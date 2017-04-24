import initialState from '../../initialstate.js'
import extend from 'lodash/extend'
import clone from 'lodash/clone'

export default function messagesReducer (state = initialState.messages, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return extend(clone(state), {
        [action.key]: {
          content: action.content,
          timeStamp: action.timeStamp,
          uid: action.uid
        }
      })
    default:
      return state
  }
}
