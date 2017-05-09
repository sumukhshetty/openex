import {firebaseRef} from './../../index.js'

export const GET_USER_SCREEN = 'GET_USER_SCREEN'
function getUserScreen(userScreenPayload) {
  return {
    type: GET_USER_SCREEN,
    payload: userScreenPayload
  }
}

module.exports = {
  userScreen: (userUid) => (dispatch) => {
    //do stuff
    console.log("UserScreenActions.getUserScreen")
    console.log(userUid)
    var userScreenPayload = {}
    //get all the user data needed and load it onto the userScreenPayload
    firebaseRef.database().ref(/users/+userUid).once("value", function(snap){
      var userData = snap.val()
      userScreenPayload['username'] = userData.username
      userScreenPayload['lastOnline'] = userData.lastOnline
      userScreenPayload['numberOfTrades'] = userData.numberOfTrades
      userScreenPayload['verifiedEmail'] = userData.verifiedEmail
      dispatch(getUserScreen(userScreenPayload))
    })
  }
}