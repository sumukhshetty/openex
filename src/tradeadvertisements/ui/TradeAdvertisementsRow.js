import React, { Component } from 'react'
import EditTradeAdvertisementButton from './../layouts/EditTradeAdvertisementButton'
import AddEtherModal from './../layouts/AddEtherModal'

export default class TradeAdvertisementsRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      tradeType: this.props.tradeType,
      showEscrowModal: false,
      sendAmount: 0,
      sendEtherState: this.props.sendEtherState
    }
  }

  showEscrowModal () {
    this.setState({showEscrowModal: true})
  }

  removeEscrowModal (e) {
    if (this.props.sendEtherState !== 'sending' && e.target.classList.contains('bg-black-80')) {
      this.setState({showEscrowModal: false})
      this.props.resetEtherState()
    }
  }

  handleEscrowRequest () {
    console.log('trade request handled')
    // ISSUE-231-16: orderId changes to tradeAdvertisementId
    this.props.addEther(this.state.sendAmount, this.props.tradeAdvertisementId, this.props.tradeadvertisement.contractAddress, this.props.web3.web3)
  }

  onEtherAmountChange (e) {
    this.setState({sendAmount: e.target.value})
  }

  render () {
    console.log("TradeAdvertisementsRow")
    console.log(this.props.tradeadvertisement)
    if (this.props.tradeadvertisement) {
      var tradeAdvertisement = this.props.tradeadvertisement;
      var display_id
      if (tradeAdvertisement.contractAddress){
        display_id = tradeAdvertisement.contractAddress.slice(2,6)
      } else {
        display_id = "-"
      }
      // ISSUE-231-18: get the available balance from the contract
      var availableBalance
      if (tradeAdvertisement.availableBalance) {
        availableBalance = tradeAdvertisement.availableBalance - tradeAdvertisement.pendingBalance
        availableBalance = (availableBalance % 1 !== 0) ? availableBalance.toFixed(4) : availableBalance
      }

      return (
        <tr className='flex cxc'>
          <td className='fb5 tc'>{display_id}</td>
          <td className='fb10 tc'>{tradeAdvertisement.active ? <span className='green'>Live</span> : <span className='danger'>Disabled</span>}</td>
          <td className='fb10 tc'>{this.props.tradeType === 'sell-ether' ? 'Sell Online' : 'Buy Online'}</td>
          <td className='fb10 tc'>{this.props.tradeType === 'sell-ether' ? (availableBalance || 0) : '-'}</td>
          <td className='fb10 tc'>{tradeAdvertisement.location}</td>
          <td className='fb10 tc'>{tradeAdvertisement.paymentMethod}</td>
          <td className='fb10 tc'>{tradeAdvertisement.minTransactionLimit} - {tradeAdvertisement.maxTransactionLimit}</td>

          <span className='me flex'>
            {this.props.tradeType === 'sell-ether' &&
            <div>
              {this.state.showEscrowModal && <AddEtherModal sendEtherState={this.props.sendEtherState} close={this.removeEscrowModal.bind(this)} handleEscrowRequest={this.handleEscrowRequest.bind(this)} onEtherAmountChange={this.onEtherAmountChange.bind(this)} />}

              <button className=' grow mr3' onClick={this.showEscrowModal.bind(this)}>+ Add Ether</button></div>}
            <EditTradeAdvertisementButton tradeAdvertisementId={this.props.tradeAdvertisementId}/>
          </span>
        </tr>
      )
    } else {
      return null
    }
  }
}
