import { firebaseRef } from '../../index.js'

export const createMessage = ({content, uid}) => {
  return (dispatch) => {
    const message = {
      content,
      uid,
      timeStamp: Date.now()
    }
    firebaseRef.database().ref('chats').push(message)
  }
}

export const destroyMessage = (key) => {
  return (dispatch) => {
    firebaseRef.database().ref('chats').child(key).remove().then(() => {
      dispatch(removeMessage(key))
    })
  }
}

// when the data changes fire these actiosn in redux

export const startListeningForMessages = () => {
  return (dispatch) => {
    firebaseRef.database().ref('chats').on('child_added', (snapshot) => {
      dispatch(addMessage(snapshot.key, snapshot.val()))
    })
    firebaseRef.database().ref('chats').on('child_removed', (snapshot) => {
      dispatch(removeMessage(snapshot.key))
    })
  }
}

export const addMessage = (key = Date.now(), {content, uid}) => {
  return {
    type: 'ADD_MESSAGE',
    content,
    key,
    timeStamp: Date.now(),
    uid
  }
}

export const removeMessage = (key) => {
  return {
    type: 'REMOVE_MESSAGE',
    key
  }
}
