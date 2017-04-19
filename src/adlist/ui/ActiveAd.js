import React, { Component } from 'react';
// TODO import HelpContainer
import ViewActiveAdButton from './ViewActiveAdButton';
import AddEscrowModal from '../../accountEther/ui/AddEscrowModal';

class ActiveAd extends Component {
  constructor(props){
    super(props)
    this.state ={
      web3: this.props.web3,
      user: this.props.user,
      adData:this.props.adData,
      orderId: this.props.orderId,
      tradeType: this.props.tradeType,
      showEscrowModal: false,
      sendAmount: 0,
      sendEtherState: this.props.sendEtherState
    }
  }

  componentWillMount () {
    console.log(this.props.orderId);
    this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType);
  }

  showEscrowModal () {
    this.setState({showEscrowModal: true});
  }

  removeEscrowModal (e) {
    if (this.props.sendEtherState !== 'sending' && e.target.classList.contains('bg-black-80')) {
      this.setState({showEscrowModal: false});
      this.props.resetEtherState();
    }
  }

  handleEscrowRequest () {
    console.log('trade request handled');
    this.props.addEther(this.state.sendAmount, this.props.orderId, this.props.adData.adData[this.props.orderId].contractAddress, this.props.web3.web3);
  }

  onEtherAmountChange (e) {
    this.setState({sendAmount: e.target.value});
  }

  render () {
    if(this.props.adData.adData[this.props.orderId]) {
      var adDetails = this.props.adData.adData[this.props.orderId];
      var tradeType = (this.props.tradeType === "buy-ether") ? 'Buy Ad' : 'Sell Ad'
      return (
        <tr>
          <td className='fb5 tc'>1238</td>
          <td className='fb15 tc'>{adDetails.lastUpated}</td>
          <td className='fb10 tc'>{tradeType}</td>
          <td className='fb15 tc'>{this.props.user.data.displayName}</td>
          <td className='fb10 tc'>{adDetails.amount}</td>
          <td className='fb10 tc'>{adDetails.amount}</td>
          <td className='fb10 tc'>{adDetails.status}</td>
          <td className='fb10 tc'><i className='icon'>greendot</i> Active</td>
          <ViewActiveAdButton orderId={this.props.orderId} tradeType={this.props.tradeType}/>
          {this.props.tradeType === 'sell-ether' &&
          <div>
          {this.state.showEscrowModal && <AddEscrowModal sendEtherState={this.props.sendEtherState} close={this.removeEscrowModal.bind(this)} handleEscrowRequest={this.handleEscrowRequest.bind(this)} onEtherAmountChange={this.onEtherAmountChange.bind(this)} />}
          <td className='fb10 tc'>{adDetails.availableBalance} ETH</td>
          <button className='me grow' onClick={this.showEscrowModal.bind(this)}>+ Add Ether</button></div>}
        </tr>
      );
  } else {
    return null;
  }
  }
}

export default ActiveAd;
