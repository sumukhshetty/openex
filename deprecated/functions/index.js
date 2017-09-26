var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

const SolidityCoder = require("web3/lib/solidity/coder.js");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/QmKbFq9RrJ0qz6zqSRPO'));
const infura = web3.currentProvider;

//Maligun
var mgApiKey = "key-3d2bd1463fc87e2aff2224f96c1df70a"
var domain = "mg.automte.com"
var mailgun= require('mailgun-js')({apiKey: mgApiKey, domain:domain})

exports.createBuyTradeAdvertisement = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      var newAdvertisement = admin.database().ref('/buytradeadvertisements/'+ req.body.user.profile.country)
        .push(req.body.tradeDetails, function(error){
          admin.database().ref('/users/' + req.body.user.data.uid + '/advertisements/buyether/' +
            newAdvertisement.key + '/tradetype').set('buy-ether')
        })

    } catch (error) {
      console.log(error)
    }
  })
})

exports.createSellTradeAdvertisement = function.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      var newAdvertisement = admin.database().ref('/selltradeadvertisements/'+ req.body.user.profile.country)
        .push(req.body.tradeDetails, function(err){
          admin.database().ref('/users/'+req.body.user.data.uid+'/advertisements/sellether/' +
              newAdvertisement.key + '/tradetype').set('sell-ether')
        })
    } catch (error){
      console.log(error)
    }
  })
})

exports.sellerCreatesPurchaseRequest = function.https.onRequest((req, res) => {
  cors(req, res, ()=>{
    try {
      var newRequest = admin.database().ref(/purchaserequests/ + req.body.user.profile.country)
        .push(req.body.purchaseRequestData, function(err){
          admin.database().ref(/users/+ req.body.user.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
          admin.database().ref(/users/+ req.body.buyer.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
        })

    } catch(error){
      console.log(error)
    }
  })
})

exports.buyerCreatesPurchaseRequest = function.https.onRequest((req, res) => {
  cors(req, res, ()=>{
    try {
      var newRequest = admin.database().ref('/purchaserequests/' + req.body.buyer.profile.country)
        .push(req.body.purchaseRequestData, function(err){
          admin.database().ref('/users/' + req.body.seller.data.uid + '/activetrades/' + newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
          admin.database().ref(/users/+ req.body.buyer.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
        })
    }  catch(error){
      console.log(error)
    }

  })
})

exports.notificationPostProcesing = functions.database.ref('/users/{recipientUid}/notifications/{notificationUid}')
  .onWrite(event=>{
    let notificationUid = event.params.notificationUid
    admin.database().ref('/notifications/'+ notificationUid).once('value', function(snap){
      let notifcationData = snap.val()
      console.log(notifcationData)

      // TODO add in check to not send fcm and emails more than once if any value is written on the index
      if(notifcationData.fcm){
        if(notifcationData.recipientToken){
          admin.messaging().sendToDevice([notifcationData.recipientToken],
            {
              notification:
                {
                  title:notifcationData.title,
                  body: notifcationData.body
                }
            })
        } else {
          console.log("no token")
        }
      }
      if(notifcationData.email){
        if(notifcationData.verifiedEmail){
          var emaildata = {
            from: 'Automte Ether Exchange <no-reply@mg.automte.com>',
            to: notifcationData.recipientEmail,
            subject: notifcationData.title,
            text: notifcationData.body
          }
          mailgun.messages().send(emaildata, function(error, body){
            console.log(body);
          })
        }
      }
    })
  })

//Realtime database triggers
exports.lockedBuyOrderTimeout = functions.database.ref('/buyorders/{countryCode}/{orderId}/status')
  .onWrite(event => {
    let orderId = event.params.orderId;
    let countryCode = event.params.countryCode;
    if(event.data.val() === 'locked') {
      setTimeout(function() {
        admin.database().ref('/buyorders/'+countryCode+'/'+orderId+'/status')
        .once('value', function(snapshot) {
          if(snapshot.val() === 'locked') {
            admin.database().ref('/buyorders/'+countryCode+'/'+orderId+'/status')
            .set('Initiated');
            admin.database().ref('/buyorders/'+countryCode+'/'+orderId+'/sellerUid')
            .set('');
            admin.database().ref('/buyorders/'+countryCode+'/'+orderId+'/sellerUsername')
            .set('');
          }
        })
      }, 120000)
    }
  });

  exports.cancelBuyOrder = functions.database.ref('buyorders/{orderId}/cancelled')
    .onWrite(event => {
      admin.database().ref('/buyorders/'+event.params.orderId)
      .once('value', function(snap) {
        if(snap.val()['status'] === 'Awaiting Escrow') {
          if(snap.val()['buyerUid'] === event.data.val()) {
            //Buyer cancels
            admin.database().ref('/users/'+snap.val()['buyerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('/buyorders/'+event.params.orderId)
            .remove();
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/cancelledContract/')
            .push({
              contractAddress: snap.val()['contractAddress'],
              inEscrow: false
            })
            //TODO: AK I'm pretty sure calling self destruct on a contract is free, so do it from here.
            // Need to add that function to BuyOrder contract.
            //TODO: buyer rep affected?
            //Send notification
          } else if (snap.val()['sellerUid'] === event.data.val()) {
            //Seller cancels
            admin.database().ref('/users/'+snap.val()['buyerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('users/' + snap.val()['buyerUid'] + '/advertisements/' + event.params.orderId)
            .set({tradeType: 'buy-ether'})
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/cancelledContract/')
            .push({
              contractAddress: snap.val()['contractAddress'],
              inEscrow: false
            })
            admin.database().ref('/buyorders/'+event.params.orderId+'/sellerUid')
            .set('');
            admin.database().ref('/buyorders/'+event.params.orderId+'/sellerUsername')
            .set('');
            admin.database().ref('/buyorders/'+event.params.orderId+'/status')
            .set('Initiated')
            .then(function() {
              admin.database().ref('/buyorders/'+event.params.orderId+'/cancelled')
              .remove();
            });
            //TODO: selfdestruct contract
            //TODO: seller rep affected?
            //Send notification
          }
        } else if(snap.val()['status'] === 'In Escrow') {
          if(snap.val()['buyerUid'] === event.data.val()) {
            admin.database().ref('/users/'+snap.val()['buyerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/activeTrades/' + event.params.orderId)
            .remove();
            admin.database().ref('/buyorders/'+event.params.orderId)
            .remove();
            admin.database().ref('/users/'+snap.val()['sellerUid']+'/cancelledContract/')
            .push({
              contractAddress: snap.val()['contractAddress'],
              inEscrow: true
            })
            //TODO: notification
          }
        }
      })
    });

//HTTPS requests

//BuyOrder
exports.acceptbuy = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.database().ref('/users/'+req.body.sellerUid).once("value", function(snap){
      var userData = snap.val()
      admin.database().ref('/buyorders/'+ userData.country + '/' +req.body.orderId+'/status')
      .once('value', function(snapshot) {
        if(snapshot.val() === 'Initiated') {
          admin.database().ref('/buyorders/' + userData.country + '/' +req.body.orderId+'/status')
          .set('locked');
          admin.database().ref('/buyorders/' + userData.country + '/' +req.body.orderId+'/sellerUid')
          .set(req.body.sellerUid);
          admin.database().ref('/buyorders/' + userData.country + '/' +req.body.orderId+'/sellerUsername')
          .set(req.body.sellerUsername);
          res.status(200).send();
        } else {
          res.status(500).send({error: 'Status of order ' + req.body.orderId + ' is not Initiated'});
        }
      })
      .catch(function(e) {
        res.status(500).send({error: 'Error in firebase query: ' + e});
      })
    })
  });
});

exports.buyOrderCreated = functions.https.onRequest((req, res) => {
  //TODO: AK This function needs to actually query web3, will need to upgrade plan for that.
  cors(req, res, () => {
    infura.sendAsync({
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      id: 1,
      params: [req.body.contractTx]
    }, function(err, result) {
      if(err) {
        throw err;
      }
      if(result.result.logs[0].address !==  '0x20936d2f75958dca4cbe0ce505bd5cbb457de4d9') {
        res.status(500).send({error: 'Tx did not originate from our order factory. Tx address: ' + result.result.logs[0].address});
        throw 'Tx did not originate from our order factory';
      }
      var data = SolidityCoder.decodeParams(["address", "address", "string"], result.result.logs[0].data.replace("0x", ""));
      if(data[2] !== 'buy') {
        res.status(500).send({error: 'Not a buy order'});
        throw 'Not a buy order';
      }
      // this is your callback
      admin.database().ref('/users/'+req.body.sellerUid).once("value", function(snap){
        var userData = snap.val()
        admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId)
        .once('value', function(snapshot) {
          if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'locked') {
            admin.database().ref('/buyorders/'+ userData.country + '/' + req.body.orderId + '/contractTx')
              .set(req.body.contractTx);
            admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId + '/contractAddress')
              .set(req.body.contractAddress);
            admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId + '/status')
              .set('Awaiting Escrow');
            admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId + '/price')
              .set(req.body.price);

            admin.database().ref('users/' + snapshot.val()['buyerUid']).child('activeTrades').child(req.body.orderId).set({tradeType: 'buy-ether'});
            admin.database().ref('users/' + req.body.sellerUid).child('activeTrades').child(req.body.orderId).set({tradeType: 'buy-ether'});
            admin.database().ref('users/' + snapshot.val()['buyerUid']).child('advertisements').child(req.body.orderId).set(null);

            res.status(200).send();
          } else {
            res.status(500).send({error: 'Access denied to ' + req.body.orderId + ' is not Initiated'});
          }
        })
        .catch(function(e) {
          res.status(500).send({error: 'Error in firebase query: ' + e});
        })

      })
    });

  });
});

exports.escrowFillled = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //TODO: AK would first need to confirm with web3 that the escrow was actualyfilled
    admin.database().ref('/users/' + req.body.sellerUid).once("value", function(snap){
      var userData = snap.val()
      admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId)
      .once('value', function(snapshot) {
        if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'Awaiting Escrow') {
          admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId + '/status')
            .set('In Escrow')
          .then(function() {
            res.status(200).send();
          })
          .catch(function(e) {
            res.status(500).send({error: 'Error setting status: ' + e})
          });
        } else {
          res.status(500).send({error: 'Access denied'});
        }
      })
      .catch(function(e) {
        res.status(500).send({error: 'Error querying db: ' + e});
      });
    })
  })
});

exports.etherReleased = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //TODO: AK would first need to confirm with web3 that the ether was sent
    admin.database().ref('/users/' + req.body.sellerUid).once("value", function(snap){
      var userData = snap.val()
      admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId)
      .once('value', function(snapshot) {
        if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'Payment Confirmed') {
          admin.database().ref('/buyorders/' + userData.country + '/' + req.body.orderId + '/status')
            .set('Ether Released')
          .then(function() {
            admin.database().ref('/users/'+req.body.buyerUid+'/activeTrades/').child(req.body.orderId).remove()
            admin.database().ref('/users/'+req.body.sellerUid+'/activeTrades/').child(req.body.orderId).remove()

            admin.database().ref("users/"+req.body.buyerUid).child('completedTrades').child(req.body.orderId).set({tradeType: 'buy-ether'})
            admin.database().ref("users/"+req.body.sellerUid).child('completedTrades').child(req.body.orderId).set({tradeType: 'buy-ether'})

            admin.database().ref("users/"+req.body.buyerUid+'/lastTransfer').set(admin.database.ServerValue.TIMESTAMP)
            admin.database().ref("users/"+req.body.sellerUid+'/lastTransfer').set(admin.database.ServerValue.TIMESTAMP)
            res.status(200).send();
          })
          .catch(function(e) {
            res.status(500).send({error: 'Error setting status: ' + e})
          });
        } else {
          res.status(500).send({error: 'Access denied'});
        }
      })
      .catch(function(e) {
        res.status(500).send({error: 'Error querying db: ' + e});
      });

    })
  })
})

//Sell order
exports.postSellOrder = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      // ISSUE-231-4: the user profile will be passed as a prop so we don't have to do
      // two firebase calls to get the country. The sellorders will be changed to
      // selltradeadvertisements
      //
      // req.body.country instead of userData.country
      // req.body.sellTradeAdvertisementDetails
      admin.database().ref("/users/"+req.body.sellerUid).once("value", function(snap){
        var userData = snap.val()
        var newOrder = admin.database().ref("sellorders/"+userData.country).push(req.body.postTradeDetails);
        admin.database().ref("sellorders/"+userData.country+'/'+newOrder.key+'/orderId').set(newOrder.key);
        admin.database().ref("users/"+req.body.sellerUid+"/advertisements/").child(newOrder.key).set({tradeType: req.body.postTradeDetails.tradeType})
        admin.database().ref('/sellorders/'+userData.country+'/' + newOrder.key + '/contractTx')
        .set(req.body.contractTx);
        admin.database().ref('/sellorders/'+userData.country+'/'+ newOrder.key + '/contractAddress')
        .set(req.body.contractAddress);
      })

      res.status(200).send();
    } catch(e) {
      res.status(500).send({error: 'Error querying db: ' + e});
    }
  })
});

exports.requestEther = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      admin.database().ref('/users/'+req.body.postData.sellerUid).once("value", function(snap){
        var userData = snap.val()
        var newRequest = admin.database().ref('/purchaserequests/'+userData.country).push({
          amount: req.body.postData.amount,
          price: req.body.postData.price,
          buyerAddress: req.body.postData.buyerAddress,
          buyerUid: req.body.postData.buyerUid,
          buyerUsername: req.body.postData.buyerUsername,
          sellerUid: req.body.postData.sellerUid,
          sellerUsername: req.body.postData.sellerUsername,
          paymentMethod: req.body.postData.paymentMethod,
          createdAt: req.body.postData.createdAt,
          lastUpated: req.body.postData.lastUpated,
          status: 'Awaiting Seller Confirmation',
          contractAddress: req.body.postData.contractAddress
        }, function(err) {
          admin.database().ref('/users/'+req.body.postData.sellerUid).once("value", function(snap){
            var userData = snap.val()
            admin.database().ref('/sellorders/' + userData.country + '/' + req.body.postData.orderId + '/requests/' + newRequest.key)
            .set({
              buyerUid: req.body.postData.buyerUid
            });
            admin.database().ref('/sellorders/' + userData.country + '/' + req.body.postData.orderId + '/pendingBalance')
            .set(req.body.postData.amount);
            admin.database().ref('/sellorders/' + userData.country + '/' + req.body.postData.orderId + '/availableBalance')
            .set(req.body.postData.availableBalance - req.body.postData.amount);

          })
          admin.database().ref('/users/' + req.body.postData.sellerUid+ '/activeTrades/' + newRequest.key)
          .set({
            tradeType: 'sell-ether'
          });
          admin.database().ref('/users/' + req.body.postData.buyerUid + '/activeTrades/' + newRequest.key)
          .set({
            tradeType: 'sell-ether'
          })
          res.status(200).send()
        })
      })
    } catch(e){
      res.status(500).send({error:'[requestEther] Error :' + e})
    }
  })
})

exports.confirmTrade = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      res.status(200).send()
    } catch(e) {
      res.status(500).send({error:'[confirmTrade] Error' + e})
    }
  })
})

exports.confirmPayment = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      res.status(200).send()
    } catch(e) {
      res.status(500).send({error:'[confirmPayment] Error' + e})
    }
  })
})

exports.releaseEther = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      res.status(200).send()
    } catch(e) {
      res.status(500).send({error:'[releaseEther] Error' + e})
    }
  })
})

// Help Form
exports.helpForm = functions.https.onRequest((req, res) => {
  cors(req, res, ()=>{
    try{
      console.log(req.body.postData)
      var _subject = 'helpForm: ' + req.body.postData.topic
      var _text = req.body.postData.email + " says: " + req.body.postData.message
      var emaildata = {
        from: 'Automte Ether Exchange <no-reply@mg.automte.com>',
        to: 'quijano@automte.com, sumukh@automte.com, support@automte.com',
        subject: _subject,
        text: _text
      }
      mailgun.messages().send(emaildata, function(error, body){
        console.log(body);
      })
      res.status(200).send()
    } catch(e){
      res.status(500).send({error:'[helpForm] Error' + e})
    }
  })
})
