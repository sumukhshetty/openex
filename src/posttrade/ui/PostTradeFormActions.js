import {firebaseRef} from './../../index.js'

// New
export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


export function userCreatesBuyTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/buytradeadvertisements/'+ user.profile.country)
      .push(tradeDetails, function(error){
        firebaseRef.database().ref('/users/' + user.data.uid + '/advertisements/buyether/' + 
          newAdvertisement.key + '/tradetype').set('buy-ether')
      })
  }
}


export function userCreatesSellTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    dispatch(sendEtherState('sending'));
    try {
      var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
        .push(tradeDetails, function(err){
          firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
              newAdvertisement.key + '/tradetype').set('sell-ether')
        })
    } catch (error) {
      console.log(error)
    }
    // ISSUE-240 - call on the OrderBookFactory contract to create a new ETHOrderBook when the seller creates a trade advertisement
/*    request({
      method: 'post',
      body: {
        tradeDetails: tradeDetails,
        sellerUid: user.data.uid,
        //contractTx: txHash['tx'],
        // change this to sellOrderBook
        //contractAddress: txHash['logs'][0]['args']['orderAddress'] 
      },
      json: true,
      url: 'https://us-central1-automteetherexchange.cloudfunctions.net/createSellTradeAdvertisement'
      },
      function(err, res, body) {
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        if(res.statusCode === 200) {
          dispatch(createSellTradeAdvertisement(tradeDetails))
          browserHistory.push('/dashboard')
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
      }
    })
    .catch(function (error) {
      dispatch(sendEtherState('init'));
      console.log(error);
    })*/
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}
