import { firebaseRef } from './../../index.js'

module.exports = {
  denyKyc:(userUid)=>(dispatch)=>{
    console.log('ProcessKycActions.denyKyc')
  },
  approveKyc:(userUid, country)=>(dispatch)=>{
    console.log('ProcessKycActions.approveKyc')
    var updatedProfile
    try{
      firebaseRef.database().ref('/processkyc/'+country).child(userUid).remove()
    } catch (error) {
      console.log(error)
    }
    firebaseRef.database().ref('/users/'+userUid).once('value', function(snap){
      updatedProfile = Object.assign({},
        snap.val(), {
          kycComplete:true
        })
      firebaseRef.database().ref('/users/'+userUid).set(updatedProfile)
    })
  },
  getPhotoId:(userUid)=>(dispatch)=>{
    console.log('ProcessKycActions.getPhotoId')
  }
}