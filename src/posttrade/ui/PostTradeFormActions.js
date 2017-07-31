import {firebaseRef, raven} from './../../index.js'
import {notify} from 'react-notify-toast'


export function userCreatesBuyTradeAdvertisement(tradeDetails, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/buytradeadvertisements/'+ user.profile.country)
      .push(tradeDetails, function(error){
        firebaseRef.database().ref('/users/' + user.data.uid + '/advertisements/buyether/' +
          newAdvertisement.key + '/tradetype').set('buy-ether')
      })
  }
}

export function userCreatesSellTradeAdvertisement(tradeDetails, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
              .push(tradeDetails, function(err){
                firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                    newAdvertisement.key + '/tradetype').set('sell-ether')
              })
  }
}
