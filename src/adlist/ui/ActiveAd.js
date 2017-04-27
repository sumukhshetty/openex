import React, { Component } from 'react'
// TODO import HelpContainer
import ViewActiveAdButton from './ViewActiveAdButton'
import AddEscrowModal from './AddEscrowModal'

export default class ActiveAd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      adData: this.props.adData,
      orderId: this.props.orderId,
      tradeType: this.props.tradeType,
      showEscrowModal: false,
      sendAmount: 0,
      sendEtherState: this.props.sendEtherState
    }
  }

  componentWillMount () {
    this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType)
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
    this.props.addEther(this.state.sendAmount, this.props.orderId, this.props.adData.adData[this.props.orderId].contractAddress, this.props.web3.web3)
  }

  onEtherAmountChange (e) {
    this.setState({sendAmount: e.target.value})
  }

  render () {
    if (this.props.adData.adData[this.props.orderId]) {
      var adDetails = this.props.adData.adData[this.props.orderId];
      var display_id
      if (adDetails.contractAddress){
        display_id = adDetails.contractAddress.slice(2,6)
      } else {
        display_id = "-"
      }
      var availableBalance
      if (adDetails.availableBalance) {
        availableBalance = adDetails.availableBalance - adDetails.pendingBalance
        availableBalance = (availableBalance % 1 !== 0) ? availableBalance.toFixed(4) : availableBalance
      }
      var tradeType = (this.props.tradeType === 'buy-ether') ? 'Buy Ad' : 'Sell Ad'

      return (
        <tr className='flex cxc'>
          <td className='fb5 tc'>{display_id}</td>
          <td className='fb10 tc'>{adDetails.active ? <span className='green'>Live</span> : <span className='danger'>Disabled</span>}</td>
          <td className='fb10 tc'>{adDetails.tradeType === 'sell-ether' ? 'Sell Online' : 'Buy Online'}</td>
          <td className='fb10 tc'>{adDetails.tradeType === 'sell-ether' ? (availableBalance || 0) : '-'}</td>
          <td className='fb10 tc'>{adDetails.location}</td>
          <td className='fb10 tc'>{adDetails.paymentMethod}</td>
          <td className='fb10 tc'>{adDetails.minTransactionLimit} - {adDetails.maxTransactionLimit}</td>

          <span className='me flex'>
            {this.props.tradeType === 'sell-ether' &&
            <div>
              {this.state.showEscrowModal && <AddEscrowModal sendEtherState={this.props.sendEtherState} close={this.removeEscrowModal.bind(this)} handleEscrowRequest={this.handleEscrowRequest.bind(this)} onEtherAmountChange={this.onEtherAmountChange.bind(this)} />}

              <button className=' grow mr3' onClick={this.showEscrowModal.bind(this)}>+ Add Ether</button></div>}
            <ViewActiveAdButton orderId={this.props.orderId}
              tradeType={this.props.tradeType} />
          </span>
        </tr>
      )
    } else {
      return null
    }
  }
}
