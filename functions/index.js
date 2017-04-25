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
