import React, { Component } from 'react'
import EditTradeAdvertisementButton from './../layouts/EditTradeAdvertisementButton'

export default class TradeAdvertisementsRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      tradeType: this.props.tradeType,
      showEscrowModal: false,
      sendAmount: 0,
      sendEtherState: this.props.sendEtherState
    }
  }

  showEscrowModal() {
    this.setState({ showEscrowModal: true })
  }

  removeEscrowModal(e) {
    if (
      this.props.sendEtherState !== 'sending' &&
      e.target.classList.contains('bg-black-80')
    ) {
      this.setState({ showEscrowModal: false })
      this.props.resetEtherState()
    }
  }

  handleEscrowRequest() {

    this.props.addEther(
      this.state.sendAmount,
      this.props.user.data.uid,
      this.props.ethorderbook.data.address,
      this.props.web3.data,
      this.props.ethorderbook.data
    )
  }

  onEtherAmountChange(e) {
    this.setState({ sendAmount: e.target.value })
  }

  render() {
    if (this.props.tradeadvertisement) {
      var tradeAdvertisement = this.props.tradeadvertisement

      return (
        <tr className="flex cxc">
          <td className="fb5 tc">
            {this.props.tradeAdvertisementId.slice(1, 6)}
          </td>
          <td className="fb10 tc">
            {tradeAdvertisement.active
              ? <span className="green">Live</span>
              : <span className="danger">Disabled</span>}
          </td>
          <td className="fb10 tc">
            {this.props.tradeType === 'sell-ether'
              ? 'Sell Online'
              : 'Buy Online'}
          </td>
          <td className="fb10 tc">
            {tradeAdvertisement.location}
          </td>
          <td className="fb10 tc">
            {tradeAdvertisement.paymentMethod}
          </td>
          <td className="fb10 tc">
            {tradeAdvertisement.minTransactionLimit} -
            {tradeAdvertisement.maxTransactionLimit}
          </td>
          <td className="me flex">
            <EditTradeAdvertisementButton
              tradeAdvertisementId={this.props.tradeAdvertisementId}
              tradeType={this.props.tradeType}
            />
          </td>
        </tr>
      )
    } else {
      return null
    }
  }
}
