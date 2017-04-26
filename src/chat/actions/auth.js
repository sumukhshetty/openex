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

export const getUser = (tradeId, buyerId, sellerId) => {
  return (dispatch) => {
    dispatch(signedIn(firebaseRef.auth().currentUser))
    firebaseRef.database()
    .ref('chatrooms')
    .child(tradeId)
    .update({
      'buyerUid': buyerId,
      'sellerUid': sellerId
    })
  }
}
