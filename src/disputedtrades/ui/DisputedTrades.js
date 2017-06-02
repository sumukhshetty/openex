import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {firebaseRef} from './../../index.js'
const request = require('request')

class DisputedTrades extends Component {

  checkAdmin() {
    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/checkAdmin'
    var options = {
      method: 'post',
      body: {userUid:firebaseRef.auth().currentUser.uid},
      json: true,
      url: url
    }
    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var statusCode = res.statusCode
      if (statusCode === 200){
        browserHistory.push('/admin')
      }
      if (statusCode === 500){
        throw res.body.error
      }
      if (statusCode === 401){
        throw res.body.error
      }
    })
  }

  render () {
    if(this.props.user){
      if(this.props.user.profile){
        if (this.props.user.profile !== null){
          if (this.props.user.profile.isAdmin){
            return (
              <div>
                <a onClick={this.checkAdmin}> Go to admin</a>
              </div>
            );
          } else {
            return (<div></div>)  
          }
        } else {
          return (<div></div>)
        }
      } else {
        return (<div></div>)
      }
    } else {
      return(<div></div>)
    }
  }
}

export default DisputedTrades;
