import {firebaseRef} from '../index.js'
import * as firebase from 'firebase'

export function userPresence(uid) {
  console.log('userPresence')
  // since I can connect from multiple devices or browser tabs, we store each connection instance separately
  // any time that connectionsRef's value is null (i.e. has no children) I am offline
  var myConnectionsRef = firebaseRef.database().ref('/users/'+uid+'/connections');

  // stores the timestamp of my last disconnect (the last time I was seen online)
  var lastOnlineRef = firebaseRef.database().ref('/users/'+uid+'/lastOnline');

  var connectedRef = firebaseRef.database().ref('.info/connected');
  console.log(connectedRef)
  connectedRef.on('value', function(snap) {
    console.log(snap.val())
    if (snap.val() === true) {
      // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
      lastOnlineRef.set(firebase.database.ServerValue.TIMESTAMP);
      // add this device to my connections list
      // this value could contain info about the device or a timestamp too
      var con = myConnectionsRef.push(true);

      // when I disconnect, remove this device
      con.onDisconnect().remove();

      // when I disconnect, update the last time I was seen online
      lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }
  });
}
