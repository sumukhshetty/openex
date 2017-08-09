export default function messagesReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        [action.key]: {
          content: action.content,
          timeStamp: action.timeStamp,
          uid: action.uid,
          download: action.download,
          fileType: action.fileType,
          tradeId: action.tradeId
        }
      }
    case 'CLEAR_MESSAGES_FROM_STATE':
      return {}
    default:
      return state
  }
}
