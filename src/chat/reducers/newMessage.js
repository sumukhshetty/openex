import initialState from '../../initialstate.js'

export default function newMessageReducer (state = initialState.newMessage, action) {
  switch (action.type) {
    case 'UPDATE_NEW_MESSAGE':
      return action.content
    default:
      return state
  }
}
