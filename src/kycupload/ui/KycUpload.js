import React, { Component } from 'react';

import { browserHistory } from 'react-router'

import { firebaseRef, firebaseStorage } from '../../index.js'
import KycCountryInfo from './../layouts/KycCountryInfo'

export default class KycUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      error: null
    }
  }

  storeFileInState(e){
    const file = e.target.files[0]
    this.setState({file:file, error: null})
  }

  uploadKycFile(){
    console.log("ui.KycUpload.uploadKycFile")
    console.log(this.props, this.state.file)
    if(this.state.file){
      console.log("we have a file to upload")
      console.log(this.props.user, this.state.file)
      var uploadRef = firebaseStorage.ref('/kyc/'+ this.props.user.profile.country + '/' + this.props.user.data.uid)
          .put(this.state.file, {contentType:this.state.file.type})
      uploadRef.then((result)=>{
        console.log('then')
        firebaseRef.database().ref('/processkyc/'+this.props.user.profile.country+ '/'+ this.props.user.data.uid).set(true)
        browserHistory.push('/dashboard')
      })
      //this.props.uploadKycFile(this.props.user, this.state.file)
    } else {
      this.setState({error:"please select a file"})
      throw "please upload a file"
    }
  }

  render () {
    console.log('KycUpload.render')
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="center mt5">
          KYC verification
          <KycCountryInfo country={this.props.user.profile.country}/>
          <div>
          <div>
          {this.state.error ? "please select a file" : null}
          </div>
          <input
            type='file'
            accept='.png, .pdf, .jpg'
            onChange={this.storeFileInState.bind(this)} />
          <button onClick={this.uploadKycFile.bind(this)}> Upload </button>
          </div>
      </div>
    )
    }
}
