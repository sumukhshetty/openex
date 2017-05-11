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
    console.log('called getEtherPrice');
    firebaseRef.database().ref('users/'+uid+'/currency').once('value', function(snap){
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
            console.log('got the price: ' + prices[toSymbols]);
            dispatch(etherPrice(prices[toSymbols]))
          }
        })
    })
  }
}
