import {firebaseRef} from './../index.js'

module.exports = {
  removeOrderFromActiveEscrows: (uid, orderId) => {
    firebaseRef.database().ref('/users/'+uid+'/activeTrades/').child(orderId).remove()
  },
  addOrderToCompletedTrades: (uid, orderId, tradeType)=> {
    firebaseRef.database().ref("users/"+uid).child('completedTrades').child(orderId).set({tradeType: tradeType})
  }
}
