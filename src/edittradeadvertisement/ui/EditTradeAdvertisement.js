import React, { Component } from 'react';
import EditTradeAdvertisementInstructions from './../layouts/EditTradeAdvertisementInstructions'
import EditTradeAdvertisementForm from './EditTradeAdvertisementForm'

class EditTradeAdvertisement extends Component {
  componentWillMount(){
    console.log("EditTradeAdvertisement.componentWillMount")
    this.props.onBeforeComponentLoad(this.props.tradeAdvertisementId, this.props.tradeAdvertisementType, this.props.buytradeadvertisements, this.props.selltradeadvertisements)
  }
  render () {
    console.log("EditTradeAdvertisement.render")
    var display
    if (this.props.edittradeadvertisement.data){
      console.log(this.props.etherPrice)
      display = <div>
          <EditTradeAdvertisementForm 
            tradeAdvertisement={this.props.edittradeadvertisement.data} 
            user={this.props.user}
            web3={this.props.web3}
            etherPrice={this.props.etherPrice}
            tradeAdvertisementId={this.props.tradeAdvertisementId}
            tradeAdvertisementType={this.props.tradeAdvertisementType}
            updateTradeAdvertisement={this.props.updateTradeAdvertisement}
            />
        </div>;
    } else {
      console.log("we dont have data")
      display = <div>Loading Trade Advertisement ...</div>
    }
    return (
      <div className='bg-smoke'>
        <div>
          <EditTradeAdvertisementInstructions />
        </div>
        {display}
      </div>
    );
  }
}

export default EditTradeAdvertisement;
