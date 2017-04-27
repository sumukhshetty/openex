import initialState from '../../initialstate.js'

export default function chatAuthReducer (state = initialState.auth, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        status: 'SIGNED_IN',
        email: action.email,
        displayName: action.displayName,
        photoURL: action.photoURL,
        uid: action.uid
      }
    default:
      return state
  }
}
