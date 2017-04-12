import {firebaseRef} from './../index.js'

module.exports = {
  removeOrderFromActiveEscrows: (uid, orderId) => {
    console.log("removeOrderFromActiveEscrows")
    console.log(uid)
    console.log(orderId)
    firebaseRef.database().ref('/user/'+uid+'/activeEscrows/'+orderId).remove()
  }
}