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

exports.createSellTradeAdvertisement = functions.https.onRequest((req, res) => {
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

exports.sellerCreatesPurchaseRequest = functions.https.onRequest((req, res) => {
  cors(req, res, ()=>{
    try {
      var newRequest = admin.database().ref('/purchaserequests/' + req.body.user.profile.country)
        .push(req.body.purchaseRequestData, function(err){
          admin.database().ref('/users/'+ req.body.user.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
          admin.database().ref('/users/'+ req.body.buyer.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
        })

    } catch(error){
      console.log(error)
    }
  })
})

exports.buyerCreatesPurchaseRequest = functions.https.onRequest((req, res) => {
  cors(req, res, ()=>{
    try {
      var newRequest = admin.database().ref('/purchaserequests/' + req.body.buyer.profile.country)
        .push(req.body.purchaseRequestData, function(err){
          admin.database().ref('/users/' + req.body.seller.data.uid + '/activetrades/' + newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
          admin.database().ref('/users/'+ req.body.buyer.uid+'/activetrades/'+newRequest.key).set({'tradeType': req.body.purchaseRequestData.tradeType})
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

//Check Dispute, used by Oraclize
exports.checkDispute = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      admin.database().ref('/purchaserequests/'+req.body.country+'/'+req.body.orderId)
      .once('value', function(snap) {
        if(snap.val()['status'] === "Disputed") {
          res.json({"dispute": "true"});
        } else {
          res.json({"dispute": "false"});
        }
      })
    } catch(e) {
      res.status(500).send({error:'[helpForm] Error' + e})
    }
  })
})
