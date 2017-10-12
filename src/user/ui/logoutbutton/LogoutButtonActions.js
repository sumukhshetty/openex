import { browserHistory } from 'react-router'
import {firebaseRef} from './../../../index.js'

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    const auth = firebaseRef.auth()
    auth.signOut().then(function(promise){
      console.log("logout")
      window.analytics.track('User Logged Out', {
        location: ''
      })
      dispatch(userLoggedOut())
    })

    // Redirect home.
    return browserHistory.push('/')
  }
}
