// import { firebaseRef } from '../../index.js'
//
// const signedIn = (user) => {
//   return {
//     type: 'SIGN_IN',
//     displayName: 'Arbiter',
//     uid: user.uid
//   }
// }
//
// export const getUser = (tradeId, arbiterId) => {
//   return (dispatch) => {
//     dispatch(signedIn(firebaseRef.auth().currentUser))
//     firebaseRef.database()
//     .ref('chatrooms')
//     .child(tradeId)
//     .update({
//       'Arbiter': arbiterId
//     })
//   }
// }
