import {firebaseRef} from './../index.js'

module.exports = {
  removeOrderFromActiveEscrows: (uid, orderId) => {
    firebaseRef.database().ref('/users/'+uid+'/activeEscrows/').child(orderId).remove()
  },
  addOrderToCompletedTrades: (uid, orderId)=> {
    firebaseRef.database().ref("users/"+uid).child('completedTrades').child(orderId).set({value: 'true'})
  }
}