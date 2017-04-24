import { firebaseRef } from '../../index.js'

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL
  }
}

// this should be a chatroom not just any new user
export const startListeningForUsers = () => {
  return (dispatch) => {
    firebaseRef.database()
    .ref('users')
    .on('child_added', (snapshot) => {
      dispatch(addUser(snapshot.val()))
    })
  }
}
