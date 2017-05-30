import { browserHistory } from 'react-router'

//const request = require('request')
import {firebaseRef} from './../../index.js'


function setEditTradeAdvertisement(editTradeAdvertisementPayload){
  return {
    type: 'SET_EDIT_TRADE_ADVERTISEMENT',
    payload: editTradeAdvertisementPayload
  }
}

function clearEditTradeAdvertisement(){
  return {
    type: 'CLEAR_EDIT_TRADE_ADVERTISEMENT',
    payload: null
  }
}


module.exports = {
  setEditTradeAdvertisement: (tradeAdvertisementId, tradeAdvertisementType, buytradeadvertisements, selltradeadvertisements) => (dispatch) => {
    var editTradeAdvertisement
    if (tradeAdvertisementType === 'buy-ether') {
      editTradeAdvertisement = buytradeadvertisements.data[tradeAdvertisementId] 
    } else {
      editTradeAdvertisement = selltradeadvertisements.data[tradeAdvertisementId] 
    }
    dispatch(setEditTradeAdvertisement(editTradeAdvertisement))
  },
  updateTradeAdvertisement: (editTradeAdvertisementData, tradeAdvertisementId, tradeAdvertisementType, user) => {
    var tradeTypeRef
    if (tradeAdvertisementType === 'buy-ether'){
      tradeTypeRef = '/buytradeadvertisements/'
    } else {
      tradeTypeRef = '/selltradeadvertisements/'
    }
    firebaseRef.database().ref(tradeTypeRef+user.profile.country+'/'+tradeAdvertisementId).set(editTradeAdvertisementData).then(function(snap){
      browserHistory.push('/dashboard')
    })
  },
  clearState: () => (dispatch) =>{
    dispatch(clearEditTradeAdvertisement())
  }
}
