const request = require('request')
import {firebaseRef} from './../index.js';
export const GET_ETHER_PRICE = 'GET_ETHER_PRICE'

function etherPrice(pricesPayload) {
  return {
  type:GET_ETHER_PRICE,
  payload: pricesPayload
  }
}

export function getEtherPrice(uid) {
  return function(dispatch) {
    firebaseRef.database().ref('/users/'+uid+'/currency').once('value', function(snap){
      let toSymbols = snap.val();
      request({
          method: 'GET',
          url: 'https://min-api.cryptocompare.com/data/price',
          qs: { fsym: 'ETH', tsyms: toSymbols }
        },
        function(err, res, body) {
          if (err) {
            console.error('error querying for price: ', err)
            throw err
          }
          if(res.statusCode === 200) {
            let prices = JSON.parse(body);
            // ISSUE-253 dont dispatch this to the store - make a write to firebase
            // and then dipatch from firebase as the single source of truth
            dispatch(etherPrice(prices[toSymbols]))
          }
        })
    })
  }
}
