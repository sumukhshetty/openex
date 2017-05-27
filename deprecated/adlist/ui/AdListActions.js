import {firebaseRef} from './../../index.js'

export const GET_ACTIVE_ADS = 'GET_ACTIVE_ADS'
function getActiveTrades(activeAdsPayload) {
  return {
    type: GET_ACTIVE_ADS,
    payload: activeAdsPayload
  }
}


module.exports = {
  getAds: (user) => (dispatch) => {
    firebaseRef.database()
      .ref('/users/'+user.data.uid+'/advertisements')
      .on("value", function(snapshot){
        dispatch(getActiveTrades(snapshot.val()))
      })

  }
}
