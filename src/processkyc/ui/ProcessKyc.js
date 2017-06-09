import React, { Component } from 'react';

import { firebaseStorage } from './../../index.js'

export default class ProcessKyc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url:null
    }
  }
  componentWillMount(){
    this.props.getPhotoId(this.props.userUid)
    var component = this
    var kycPhoto = firebaseStorage.ref('/kyc/'+this.props.country+'/'+this.props.userUid)
    try{
      kycPhoto.getDownloadURL().then(function(url){
        component.setState({url:url})
      })
    } catch(error){


    }
  }

  approveKyc(){
    this.props.approveKyc(this.props.userUid, this.props.country)
  }

  denyKyc(){
    this.props.denyKyc(this.props.userUid)
  }

  render () {
    return (
      <div>
      <div>The photo goes here
      <img src={this.state.url}/>
      </div>
      <button onClick={this.approveKyc.bind(this)}>Aprrove KYC</button>
      <button onClick={this.denyKyc.bind(this)}>deny KYC</button>
      </div>
    );
  }
}
