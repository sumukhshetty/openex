import {firebaseRef, firebaseMessaging} from './../../index.js'

export const ENABLE_NOTIFICATIONS = 'ENABLE_NOTIFICATIONS'
function enableNotifications(enableNotificationPayload) {
  return {
    type: ENABLE_NOTIFICATIONS,
    payload: enableNotificationPayload
  }
}

export const DONT_SHOW_AGAINN = 'DONT_SHOW_AGAINN'
function dontShowAgain(enableNotificationPayload) {
  return {
    type: DONT_SHOW_AGAINN,
    payload: enableNotificationPayload
  }
}

module.exports = {
  onBeforeComponentLoad: (user) => (dispatch) => {
    firebaseMessaging.onTokenRefresh(function() {
      firebaseMessaging.getToken()
      .then(function(refreshedToken) {
        console.log('Token refreshed.');
        firebaseRef.database().ref('/users/'+user.data.uid+'/fcmToken').set(refreshedToken)

      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        //showToken('Unable to retrieve refreshed token ', err);
      });
    });
    firebaseMessaging.onMessage(function(payload){
      //TODO: call on a function to load the notification in the bell icon and notifications ref
      console.log('onMessage: ',payload)
    });

  },

  enableNotifications: (user) => (dispatch) => {
    console.log("EnableNotificationsActions.enableNotifications")

    firebaseMessaging.getToken().then(function(token){
      if(token){
        firebaseRef.database().ref('/users/'+user.data.uid+'/fcmToken').set(token)
        firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)  
      } else {
        firebaseMessaging.requestPermission().then(function(){
          return firebaseMessaging.getToken()
        }).then(function(token){
          firebaseRef.database().ref('/users/'+user.data.uid+'/fcmToken').set(token)
          firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)    
        })

      }
    }).catch(function(err){
      console.log('Unable to get permission to notify.', err);
      firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)
    })

/*    firebaseMessaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      return firebaseMessaging.getToken()
    })
    .then(function(token){
      console.log(token)
      firebaseRef.database().ref('/users/'+user.data.uid+'/fcmToken').set(token)
      firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
      firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)
    });*/
  },

  dontShowAgain: (user) => (dispatch) => {
    console.log("dontShowAgain")
    firebaseRef.database().ref('/users/'+user.data.uid+'/shownotificationrequest').set(false)
  },

  getNotificationsSettings: (user)=> (dispatch) => {
    console.log("getNotificationsSettings")
  }
}
