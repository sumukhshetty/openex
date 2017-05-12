import { firebaseRef } from '../../index.js'

export const createMessage = ({content, uid, tradeId, download}) => {
  return (dispatch) => {
    const message = {
      content,
      uid,
      timeStamp: Date.now(),
      download
    }
    firebaseRef.database()
    .ref('chatrooms')
    .child(`${tradeId}/messages`)
    .push(message)
  }
}

// when the data changes fire these actions in redux

export const startListeningForMessages = (tradeId) => {
  return (dispatch) => {
    firebaseRef.database()
    .ref('chatrooms')
    .child(`${tradeId}/messages`)
    .on('child_added',
    (snapshot) => {
      dispatch(addMessage(snapshot.key, snapshot.val(), tradeId))
    }
  )
  }
}

export const addMessage = (key, message, tradeId) => {
  return {
    type: 'ADD_MESSAGE',
    content: message.content,
    key,
    timeStamp: Date.now(),
    uid: message.uid,
    tradeId,
    download: message.download
  }
}

export const clearMessagesFromState = () => {
  return {
    type: 'CLEAR_MESSAGES_FROM_STATE'
  }
}
