const request = require('request')
export const GET_ETHER_PRICE = 'GET_ETHER_PRICE'
function etherPrice(pricesPayload) {
  return {
  type:GET_ETHER_PRICE,
  payload: pricesPayload
  }
}


export function getEtherPrice(toSymbols) {
  return function(dispatch) {
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
          dispatch(etherPrice(prices))
        }
      });

  }
}
