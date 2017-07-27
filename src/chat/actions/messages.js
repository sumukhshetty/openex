import { firebaseRef } from '../../index.js'
import * as notificationHelpers from './../../util/notificationHelpers'

export const createMessage = ({
  content,
  uid,
  tradeId,
  download,
  purchaseRequest,
  fileType
}) => {
  return dispatch => {
    const message = {
      content,
      uid,
      timeStamp: Date.now(),
      download,
      fileType
    }
    firebaseRef
      .database()
      .ref('chatrooms')
      .child(`${tradeId}/messages`)
      .push(message)
    notificationHelpers.sendNewChatNotification(
      uid,
      purchaseRequest,
      tradeId,
      content
    )
  }
}

export const addMessage = (key, message, tradeId) => {
  return {
    type: 'ADD_MESSAGE',
    content: message.content,
    key,
    timeStamp: message.timeStamp,
    uid: message.uid,
    tradeId,
    download: message.download,
    fileType: message.fileType
  }
}
// when the data changes fire these actions in redux

export const startListeningForMessages = tradeId => {
  return dispatch => {
    firebaseRef
      .database()
      .ref('chatrooms')
      .child(`${tradeId}/messages`)
      .on('child_added', snapshot => {
        dispatch(addMessage(snapshot.key, snapshot.val(), tradeId))
      })
  }
}

export const clearMessagesFromState = () => {
  return {
    type: 'CLEAR_MESSAGES_FROM_STATE'
  }
}
