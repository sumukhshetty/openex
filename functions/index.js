var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

//Realtime database triggers
exports.lockedBuyOrderTimeout = functions.database.ref('/buyorders/{orderId}/status')
  .onWrite(event => {
    let orderId = event.params.orderId;
    if(event.data.val() === 'locked') {
      setTimeout(function() {
        admin.database().ref('/buyorders/'+orderId+'/status')
        .once('value', function(snapshot) {
          if(snapshot.val() === 'locked') {
            admin.database().ref('/buyorders/'+orderId+'/status')
            .set('Initiated');
            admin.database().ref('/buyorders/'+orderId+'/sellerUid')
            .set('');
            admin.database().ref('/buyorders/'+orderId+'/sellerUsername')
            .set('');
          }
        })
      }, 40000)
    }
  });

//HTTPS requests

//BuyOrder
exports.acceptbuy = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.database().ref('/buyorders/'+req.body.orderId+'/status')
    .once('value', function(snapshot) {
      if(snapshot.val() === 'Initiated') {
        admin.database().ref('/buyorders/'+req.body.orderId+'/status')
        .set('locked');
        admin.database().ref('/buyorders/'+req.body.orderId+'/sellerUid')
        .set(req.body.sellerUid);
        admin.database().ref('/buyorders/'+req.body.orderId+'/sellerUsername')
        .set(req.body.sellerUsername);
        res.status(200).send();
      } else {
        res.status(500).send({error: 'Status of order ' + req.body.orderId + ' is not Initiated'});
      }
    })
    .catch(function(e) {
      res.status(500).send({error: 'Error in firebase query: ' + e});
    })
  });
});

exports.buyOrderCreated = functions.https.onRequest((req, res) => {
  //TODO: AK This function needs to actually query web3, will need to upgrade plan for that.
  cors(req, res, () => {
    admin.database().ref('/buyorders/' + req.body.orderId)
    .once('value', function(snapshot) {
      if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'locked') {
        admin.database().ref('/buyorders/' + req.body.orderId + '/contractTx')
          .set(req.body.contractTx);
        admin.database().ref('/buyorders/' + req.body.orderId + '/contractAddress')
          .set(req.body.contractAddress);
        admin.database().ref('/buyorders/' + req.body.orderId + '/status')
          .set('Awaiting Escrow');
        admin.database().ref('/buyorders/' + req.body.orderId + '/price')
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
  });
});

exports.escrowFillled = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //TODO: AK would first need to confirm with web3 that the escrow was actualyfilled
    admin.database().ref('/buyorders/' + req.body.orderId)
    .once('value', function(snapshot) {
      if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'Awaiting Escrow') {
        admin.database().ref('/buyorders/' + req.body.orderId + '/status')
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
});

exports.etherReleased = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //TODO: AK would first need to confirm with web3 that the ether was sent
    admin.database().ref('/buyorders/' + req.body.orderId)
    .once('value', function(snapshot) {
      if(snapshot.val()['sellerUid'] === req.body.sellerUid && snapshot.val()['status'] === 'Payment Confirmed') {
        admin.database().ref('/buyorders/' + req.body.orderId + '/status')
          .set('Ether Released')
        .then(function() {
          admin.database().ref('/users/'+req.body.buyerUid+'/activeTrades/').child(req.body.orderId).remove()
          admin.database().ref('/users/'+req.body.sellerUid+'/activeTrades/').child(req.body.orderId).remove()

          admin.database().ref("users/"+req.body.buyerUid).child('completedTrades').child(req.body.orderId).set({tradeType: 'buy-order'})
          admin.database().ref("users/"+req.body.sellerUid).child('completedTrades').child(req.body.orderId).set({tradeType: 'buy-order'})

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

//Sell order
exports.postSellOrder = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      var newOrder = admin.database().ref("sellorders/").push(req.body.postTradeDetails);
      admin.database().ref("sellorders/"+newOrder.key+'/orderId').set(newOrder.key);
      admin.database().ref("users/"+req.body.sellerUid+"/advertisements/").child(newOrder.key).set({tradeType: req.body.postTradeDetails.tradeType})
      admin.database().ref('/sellorders/' + newOrder.key + '/contractTx')
      .set(req.body.contractTx);
      admin.database().ref('/sellorders/' + newOrder.key + '/contractAddress')
      .set(req.body.contractAddress);

      res.status(200).send();
    } catch(e) {
      res.status(500).send({error: 'Error querying db: ' + e});
    }
  })
});

exports.requestEther = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try{
      var newRequest = admin.database().ref('/purchaserequests').push({
        amount: req.body.postData.amount,
        price: req.body.postData.price,
        buyerAddress: req.body.postData.buyerAddress,
        buyerUid: req.body.postData.buyerUid,
        buyerUsername: req.body.postData.buyerUsername,
        sellerUid: req.body.postData.sellerUid,
        sellerUsername: req.body.postData.sellerUsername,
        paymentMethod: req.body.postData.paymentMethod,
        bankInformation: req.body.postData.bankInformation,
        createdAt: req.body.postData.createdAt,
        lastUpated: req.body.postData.lastUpated,
        status: 'Awaiting Seller Confirmation',
        contractAddress: req.body.postData.contractAddress
      }, function(err) {
        admin.database().ref('/sellorders/' + req.body.postData.orderId + '/requests/' + newRequest.key)
        .set({
          buyerUid: req.body.postData.buyerUid
        });
        admin.database().ref('/sellorders/' + req.body.postData.orderId + '/pendingBalance')
        .set(req.body.postData.amount);
        admin.database().ref('/sellorders/' + req.body.postData.orderId + '/availableBalance')
        .set(req.body.postData.availableBalance - req.body.postData.amount);
        admin.database().ref('/users/' + req.body.postData.sellerUid+ '/activeTrades/' + newRequest.key)
        .set({
          tradeType: 'sell-ether'
        });
        admin.database().ref('/users/' + req.body.postData.buyerUid + '/activeTrades/' + newRequest.key)
        .set({
          tradeType: 'sell-ether'
        })
        var _bodyText = req.body.postData.buyerUsername + " wants to buy some ether"
        admin.messaging().sendToDevice([req.body.postData.sellerFcmToken],
          {notification:
            {
              title:"New Ether Purchase Request",
              body: _bodyText
            }})
        // TODO @qj acll to mailgun api to send an email
        res.status(200).send()
      })
    } catch(e){
      res.status(500).send({error:'[requestEther] Error :' + e})
    }
  })
})

exports.fcmHelloWorld = functions.https.onRequest((req,res) => {
  cors(req, res, () => {
    try{
    admin.messaging().sendToDevice(["dQt95qxIUaY:APA91bF3pndsx_XwxfhvjrLImxs6tb1EZlu0jVS5mbJnIjA7pN7IFdkQHqxzVsse1sCZUOGRUweM3Jb8pMk9LeBrGDu7ULn3Ld6Q7QQvldHijByO5huVZ1UJ_tFpVb9wUO1I4629Qws3"],
      {notification:{title:"hello",body:"world Delhi"}})
    res.status(200).send();
    } catch(e){
     res.status(500).send({error: '[fcmHelloWorld] Error : ' + e}); 
    }
  })
})