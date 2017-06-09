import React, { Component } from 'react';

class KycCountryInfo extends Component {
  render() {
    console.log("country: ", this.props.country, " [KycCountryInfo.js]");
    switch(this.props.country) {
      case 'IN':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Please Upload a photo of your Aadhaar card</p>
            <p>Once you've uploaded your Aadhaar card we'll process the kyc and activate your ads</p>
          </div>
        )
      case 'US':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Please Upload a photo of your State Drivers license with your current address</p>
            <p>Once you've uploaded your DL we'll process the kyc and activate your ads</p>
          </div>
        )
      default:
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Invalid State Error</p>
            <p>Please contact support.</p>
          </div>
        )
    }
  }
}

export default KycCountryInfo;
