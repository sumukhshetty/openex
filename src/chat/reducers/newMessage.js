
export default function newMessageReducer (state = '', action) {
  switch (action.type) {
    case 'UPDATE_NEW_MESSAGE':
      return action.content
    case 'CLEAR_NEW_MESSAGE':
      return ''
    default:
      return state
  }
}
