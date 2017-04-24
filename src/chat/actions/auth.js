import { firebaseRef } from '../../index.js'

const signedIn = (user) => {
  return {
    type: 'SIGN_IN',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  }
}

export const getUser = () => {
  return (dispatch) => {
    firebaseRef.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signedIn(user))
        // check if chat with tradeNumber exist here
        firebaseRef.database().ref('chatrooms').child('uniquetradeNumberGoesHere').set({'defineBuyerOrSellerTypeHere': user.uid})
      }
      // not sure what the else should be
      // if no user is detected in the middle of a trade that is a massive problem. I'm not sure its teh chat modules responsibility to handle that. Maybe I could just through a bright red error?
    })
  }
}
