//import { browserHistory } from 'react-router'

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
    console.log("EditTradeAdvertisementActions.setEditTradeAdvertisement")
    var editTradeAdvertisement
    if (tradeAdvertisementType === 'buy-ether') {
      editTradeAdvertisement = buytradeadvertisements.data[tradeAdvertisementId] 
    } else {
      editTradeAdvertisement = selltradeadvertisements.data[tradeAdvertisementId] 
    }
    dispatch(setEditTradeAdvertisement(editTradeAdvertisement))
  },
  updateTradeAdvertisement: (editTradeAdvertisementData, tradeAdvertisementId, tradeAdvertisementType) => {
    console.log('EditTradeAdvertisementActions.updateTradeAdvertisement')
    console.log(editTradeAdvertisementData, tradeAdvertisementId, tradeAdvertisementType)
    var tradeTypeRef
    if (tradeAdvertisementType === 'buy-ether'){
      tradeTypeRef = '/buytradeadvertisements/'
    } else {
      tradeTypeRef = '/selltradeadvertisements/'
    }
    console.log(tradeTypeRef)
    firebaseRef.database().ref(tradeTypeRef+tradeAdvertisementId).set(editTradeAdvertisementData)
  },
  clearState: () => (dispatch) =>{
    dispatch(clearEditTradeAdvertisement())
  }
}
