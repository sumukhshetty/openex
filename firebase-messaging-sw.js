importScripts('https://www.gstatic.com/firebasejs/3.8.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.8.0/firebase-messaging.js')
import {_firebaseconfig} from './src/index.js'
console.log("firebase-messaging-sw")

var config = {
  apiKey: "AIzaSyCABMDvmhvqZ1uMMFZqjRKeaONk2H3YcBQ",
  authDomain: "automteetherexchange.firebaseapp.com",
  databaseURL: "https://automteetherexchange.firebaseio.com",
  storageBucket: "automteetherexchange.appspot.com",
  messagingSenderId: "929792166528"
}

const firebaseRef = firebase.initializeApp(_firebaseconfig)
  
const messaging = firebaseRef.messaging();

/*messaging.onMessage(function(payload){
  console.log('onMessage: ',payload)
});*/
messaging.setBackgroundMessageHandler(function(payload) {
  //const title = payload.data.title
  const title = "hello world"
  const options = {
    body: payload.data.body
  }
  return self.registration.showNotification(title, options)
})