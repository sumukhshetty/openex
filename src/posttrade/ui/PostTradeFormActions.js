import {firebaseRef} from './../../index.js'
import { browserHistory } from 'react-router'

export function userCreatesBuyTradeAdvertisement(tradeDetails, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/buytradeadvertisements/'+ user.profile.country)
      .push(tradeDetails, function(error){
        window.analytics.track('Created Buy Trade Advertisement', {
          location: 'posttrade'
        })
        firebaseRef.database().ref('/users/' + user.data.uid + '/advertisements/buyether/' +
          newAdvertisement.key + '/tradetype').set('buy-ether')
      })
  }
}

export function userCreatesSellTradeAdvertisement(tradeDetails, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
              .push(tradeDetails, function(err){
                window.analytics.track('Created Sell Trade Advertisement', {
                  location: 'posttrade'
                })
                firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                    newAdvertisement.key + '/tradetype').set('sell-ether')
                browserHistory.push('/dashboard')
              })
  }
}
