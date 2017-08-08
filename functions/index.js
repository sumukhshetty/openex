var functions = require('firebase-functions');
const admin = require('firebase-admin');
//production
var serviceAccount = require("./service-account.json");
var databaseURL = "https://ezether-staging.firebaseio.com"
//staging
var stagingServiceAccount = require('./staging-service-account.json')
var stagingDatabaseURL = "https://ezether-staging.firebaseio.com"


admin.initializeApp({
  credential: admin.credential.cert(stagingServiceAccount),
  databaseURL: stagingDatabaseURL
});

const cors = require('cors')({origin: true});

const SolidityCoder = require("web3/lib/solidity/coder.js");
var ethUtil = require('ethereumjs-util');
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/QmKbFq9RrJ0qz6zqSRPO'));
const infura = web3.currentProvider;

//Maligun
var mgApiKey = "key-3d2bd1463fc87e2aff2224f96c1df70a"
var domain = "mg.automte.com"
var mailgun= require('mailgun-js')({apiKey: mgApiKey, domain:domain})


exports.notificationPostProcesing1 = functions.database.ref('/notifications/{recipientUid}/{purchaseRequestId}/status/{step}')
  .onWrite(event=>{
    if (event.data.previous.exists()){
      return;
    }
    if(!event.data.exists()){
      return;
    }
    let notificationUid = event.params.notificationUid
    let recipientUid = event.params.recipientUid
    let notificationData = event.data.val()
    if (notificationData.fcm) {
      if(notificationData.recipientToken){
        admin.messaging().sendToDevice([notificationData.recipientToken],
          {
            notification:
              {
                title:notificationData.title,
                body: notificationData.body
              }
          })
      } else {
        console.log("no token")
      }
    }
    if (notificationData.verifiedEmail) {
      admin.database().ref('/notificationsConfig/'+recipientUid+'/email').once('value',function(snap){
        var emaildata = {
          from: 'EZ Ether <no-reply@mg.automte.com>',
          to: snap.val(),
          subject: notificationData.title,
          text: notificationData.body
        }
        mailgun.messages().send(emaildata, function(error, body){
          console.log(body);
        })
      })
    }
  })

exports.notificationPostProcesing2 = functions.database.ref('/notifications/{recipientUid}/{notificationId}')
  .onWrite(event=>{
    if (event.data.previous.exists()){
      return;
    }
    if(!event.data.exists()){
      return;
    }
    let notificationUid = event.params.notificationUid
    let recipientUid = event.params.recipientUid
    let notificationData = event.data.val()
    if (notificationData.fcm) {
      if(notificationData.recipientToken){
        admin.messaging().sendToDevice([notificationData.recipientToken],
          {
            notification:
              {
                title:notificationData.title,
                body: notificationData.body
              }
          })
      } else {
        console.log("no token")
      }
    }
    if (notificationData.verifiedEmail) {
      admin.database().ref('/notificationsConfig/'+recipientUid+'/email').once('value',function(snap){
        var emaildata = {
          from: 'Automte Ether Exchange <no-reply@mg.automte.com>',
          to: snap.val(),
          subject: notificationData.title,
          text: notificationData.body
        }
        mailgun.messages().send(emaildata, function(error, body){
          console.log(body);
        })
      })
    }
  })


//TODO AK: update db rules for availableBalance: only account ownercan  write to balanceUpdateTx, which triggers this function
exports.etherSent = functions.database.ref('/users/{uid}/balanceUpdateTx')
  .onWrite(event=>{
    //TODO AK: possibly check that txhash hasn't already been submitted. though right now I don't see a reason for the user to abuse this.
    setTimeout(function(){
      infura.sendAsync({
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        id: 1,
        params: [event.data.val()]
      }, function(err, result) {
        if(err) {
          throw err;
        }
        //check if tx went to the user's ETHOrderBook
        let uid = event.params.uid;
        admin.database().ref('/users/'+uid+'/orderBookAddress').once("value", function(snap) {
          if(result.result.logs[0].address != snap.val()) {
            res.status(500).send({error: 'Tx did not go to users ETHOrderBook. Tx address: ' + result.result.logs[0].address + ' orderBookAddress: ' + snap.val()});
            throw 'Tx did not go to users ETHOrderBook';
          }
          //check for updated balance in logs
          var balance = SolidityCoder.decodeParams(["uint"], result.result.logs[0].data.replace("0x", ""));
          admin.database().ref('/users/'+uid+'/availableBalance').set(web3.fromWei(balance, 'ether'));
        })
      });
    }, 10000)
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
        to: 'quijano@automte.com, sumukh@automte.com, support@ezether.com',
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

//Check Dispute, used by Oraclize
exports.checkDispute = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      admin.database().ref('/purchaserequests/'+req.body.country+'/'+req.body.orderId)
      .once('value', function(snap) {
        if(snap.val()['status'] === "Seller Raised Dispute" || snap.val()['status'] === "Buyer Raised Dispute" ) {
          console.log("the trade is in dispute")
          res.json({"dispute": "true"});
        } else {
          console.log("the trade is not in dispute")
          res.json({"dispute": "false"});
        }
      })
    } catch(e) {
      res.status(500).send({error:'[helpForm] Error' + e})
    }
  })
})


// Check that the user actually is an admin

exports.checkAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      console.log(req.body)
      admin.database().ref('/users/'+ req.body.userUid)
      .once('value', function(snap) {
        if(snap.val()['isAdmin']){
          res.status(200).send()
        } else {
          res.status(401).send({error:'[checkAdmin] Error not an Admin'})
        }
      })
    } catch(error) {
      res.status(500).send({error:'[helpForm] Error' + error})
    }
  })
})

// check the signature provided for signin and if
// the recovered public address is the same as the one in
// the post then give a token

exports.signUpUserCustomAuth = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {

      var sig = req.body.signature;
      var account_address = req.body.account_address
      var data = "I am signing up for the EZ Ether marketplace and I have read the terms and conditions"

      var message = ethUtil.toBuffer(data)
      var msgHash = ethUtil.hashPersonalMessage(message)

      var signature = ethUtil.toBuffer(sig)
      var sigParams = ethUtil.fromRpcSig(signature)
      var publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
      var sender = ethUtil.publicToAddress(publicKey)
      var addr = ethUtil.bufferToHex(sender)

      var match = false;
      if (addr == account_address) { match = true; }
      if(match){
        var uid = account_address;
        var additionalClaims = {
          premiumAccount: true,
          account_address: req.body.account_address,
          email: req.body.signUpInfo.email,
          country: req.body.signUpInfo.country,
          username: req.body.signUpInfo.username
        };
        admin.database().ref('/registeredAccounts/'+ account_address).set(true)
        admin.auth().createCustomToken(uid, additionalClaims)
          .then(function(token){
            console.log(token)
            res.send(200,{status: 1, "token":token});
          });
      } else {
        res.status(401).send({error: '[signUpUserCustomAuth] Error User not Authorized'})
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({error: '[signUpUserCustomAuth] Error' + error})
    }
  })
})

exports.loginUserCustomAuth = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      var account_address = req.body.account_address
      var sig = req.body.signature;
      admin.database().ref('/registeredAccounts/'+ account_address).once('value', function(snap){
        if(snap.val()){
          var data = "I am logging into the EZ Ether marketplace and I have read the terms and conditions"

          var message = ethUtil.toBuffer(data)
          var msgHash = ethUtil.hashPersonalMessage(message)

          var signature = ethUtil.toBuffer(sig)
          var sigParams = ethUtil.fromRpcSig(signature)
          var publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
          var sender = ethUtil.publicToAddress(publicKey)
          var addr = ethUtil.bufferToHex(sender)

          var match = false;
          if (addr == account_address) { match = true; }
          if(match){
            var uid = account_address;

            admin.auth().createCustomToken(uid)
              .then(function(token){
                res.send(200,{status: 1, "token":token});
              });
          } else {
            res.status(401).send({error: '[signUpUserCustomAuth] Error User not Authorized'})
          }
        } else {
          res.status(401).send({error: "This account isn't registered yet. Please sign up first."})
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({error: '[loginUserCustomAuth] Error' + error})
    }
  })
})

exports.newPurchaseRequest = functions.database.ref('/purchaserequests/{country}/{uid}')
  .onCreate(event=>{
    console.log(event.data.val());
    admin.database().ref('/users/' + event.data.val()['sellerUid'] + '/activetrades/' + event.params.uid).set({'tradeType': event.data.val()['tradeAdvertisementType']})
    admin.database().ref('/users/'+ event.data.val()['buyerUid']+'/activetrades/'+event.params.uid).set({'tradeType': event.data.val()['tradeAdvertisementType']})
  })

exports.tradeConfirmed = functions.database.ref('/purchaserequests/{country}/{uid}/contractAddress')
  .onWrite(event =>{
    console.log(event.data.val());
    setTimeout(function(){
      infura.sendAsync({
        method: "eth_getTransactionReceipt",
        params: [event.data.val()],
        jsonrpc: "2.0",
        id: new Date().getTime()
      }, function (error, result) {
        console.log(result);
        console.log(result.result.logs[1]);
        if(error) console.error(error);

        var data = SolidityCoder.decodeParams(["string","address","address","uint","uint","string","uint"], result.result.logs[1].data.replace("0x", ""));
        var uid = data[0];
        console.log('uid from data:' + data[0]);
        var buyer = data[2];
        console.log('buyer from data:' + data[2]);
        var amount = data[3];
        console.log('amount from data: ' + web3.fromWei(data[3], 'ether'));
        admin.database().ref('/purchaserequests/'+event.params.country+'/'+event.params.uid).once('value', function(snap) {
          console.log('uid: ' + event.params.uid);
          console.log('buyer: ' + snap.val()['buyerAddress']);
          console.log('etherAmount: ' + snap.val()['etherAmount']);
          if(data[0] == event.params.uid && data[2] == snap.val()['buyerAddress'] && web3.fromWei(data[3], 'ether') == snap.val()['etherAmount']) {
            admin.database().ref('/purchaserequests/'+event.params.country+'/'+event.params.uid+'/status').set('Awaiting Payment');
            var now = (new Date()).toUTCString();
            admin.database().ref('/purchaserequests/'+event.params.country+'/'+event.params.uid+'/lastUpdated').set(now);
            admin.database().ref('/purchaserequests/'+event.params.country+'/'+event.params.uid+'/sellerconfirmtime').set(now);
          }
        })
      });
    }, 10000);

  })
