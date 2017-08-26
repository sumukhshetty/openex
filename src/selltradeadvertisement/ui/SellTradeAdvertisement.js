import React, { Component } from 'react'
import Converter from './Converter'
import Star from './../../images/Star'
import { browserHistory } from 'react-router'

export default class SellTradeAdvertisement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      etherAmount: 0,
      fiatAmount: 0,
      isButtonDisabled: false
    }
    this.createPurchaseRequest = this.createPurchaseRequest.bind(this)
  }

  componentWillMount() {
    this.props.onBeforeComponentLoad(
      this.props.selltradeadvertisements,
      this.props.sellTradeAdvertisementId,
      this.props.users
    )
  }

  componentWillUnmount() {
    this.props.onBeforeComponentWillUnmount()
  }

  createPurchaseRequest(e) {
    e.preventDefault()
    var _etherPrice = (this.props.etherPrice.data * (1 + parseFloat(this.props.selltradeadvertisement.data.margin) * 0.01)).toFixed(2)
    this.setState({ isButtonDisabled: true })
    this.props.createPurchaseRequest(
      this.state.etherAmount,
      this.state.fiatAmount,
      _etherPrice,
      this.props.sellTradeAdvertisementId,
      this.props.selltradeadvertisement.data,
      this.props.seller,
      this.props.user
    )
  }

  onAmountChange(e) {
    var marginMultiplier =
      1 + parseFloat(this.props.selltradeadvertisement.data.margin) * 0.01
    if (e.target.id === 'etherAmount') {
      this.setState({ etherAmount: e.target.value })
      this.setState({
        fiatAmount: (e.target.value *
          (this.props.etherPrice.data * marginMultiplier).toFixed(2)).toFixed(2)
      })
    } else if (e.target.id === 'fiatAmount') {
      this.setState({ fiatAmount: e.target.value })
      this.setState({
        etherAmount: (e.target.value /
          (this.props.etherPrice.data * marginMultiplier).toFixed(6)).toFixed(6)
      })
    }
  }

  render() {
    var sellTradeAdvertisement = this.props.selltradeadvertisement.data
    var seller = this.props.seller.data
    var requestComponent = (
      <div className="w-50">
        <h2 className="pv1 tc">Getting balance...</h2>
      </div>
    )
    if (sellTradeAdvertisement && seller) {
      var marginMultiplier =
        1 + parseFloat(sellTradeAdvertisement.margin) * 0.01
      var price = this.props.etherPrice
        ? (this.props.etherPrice.data * marginMultiplier).toFixed(2)
        : null
      // ISSUE-254 get available balance from the ETHOrderBook
      //var availableBalance = this.props.sellOrderContract.availableBalance;
      var minLimit =
        Number(sellTradeAdvertisement.minTransactionLimit) /
        this.props.etherPrice.data
      var maxLimit =
        Number(sellTradeAdvertisement.maxTransactionLimit) /
        this.props.etherPrice.data
      var availableBalance = 5
      if (typeof availableBalance !== 'undefined') {
        if (availableBalance > 0) {
          requestComponent = (
            <div className="w-50">
              <h2 className="pv1 tc">How much do you wish to buy?</h2>
              <h2 className="pv1 tc">
                Max Trade Limit:{availableBalance} Ether
              </h2>
              <div className="flex mxc">
                <Converter
                  maxEther={availableBalance}
                  handleTradeRequest={this.createPurchaseRequest.bind(this)}
                  onAmountChange={this.onAmountChange.bind(this)}
                  currency={this.props.user.profile.currency}
                  price={price}
                  country={seller.country}
                  etherAmount={this.state.etherAmount}
                  fiatAmount={this.state.fiatAmount}
                  isButtonDisabled={this.state.isButtonDisabled}
                  minLimit={minLimit}
                  maxLimit={maxLimit}
                />
              </div>
            </div>
          )
        } else {
          requestComponent = (
            <div className="w-50">
              <h2 className="pv1 tc">
                Sorry, the seller does not have enough ether to sell.
              </h2>
              <button>Return to Buy page</button>
            </div>
          )
        }
      }
      var url = '/user/' + sellTradeAdvertisement.sellerUid
      return (
        <div className="w-100 bg-smoke vh-100">
          <div className="w-75 center pv3">
            <h1 className="pv1">
              Buy ether using mode: {sellTradeAdvertisement.paymentMethod} from{' '}
              {seller.username}
            </h1>
            <div className="flex mxb w-100 cxc">
              <div className="w-50">
                <div className="w-100">
                  <p className="b tc measure">Terms of Trade</p>
                  <p className="pv1 measure">
                    {sellTradeAdvertisement.termsOfTrade}
                  </p>
                </div>
                <div className="mt4">
                  <table className="lh-copy">
                    <tr>
                      <td className="w4 pv2">Price</td>
                      <td className="green">
                        {this.props.etherPrice.data
                          ? (this.props.etherPrice.data *
                              marginMultiplier).toFixed(2)
                          : 'Getting price...'}{' '}
                        {this.props.user.profile.currency}/ETH
                      </td>
                    </tr>
                    <tr>
                      <td className="w4 pv2">Payment Method</td>
                      <td>
                        {sellTradeAdvertisement.paymentMethod}
                      </td>
                    </tr>
                    <tr>
                      <td className="w4 pv2">User</td>
                      <td>
                        <a onClick={() => browserHistory.push(url)}>
                          {' '}{seller.username}
                        </a>{' '}
                        ({seller.avgFeedback}
                        <Star className="dib v-mid pb1" />)
                      </td>
                    </tr>
                    <tr>
                      <td className="w4 pv2">Trade Limits</td>
                      <td>
                        {sellTradeAdvertisement.minTransactionLimit}-{' '}
                        {sellTradeAdvertisement.maxTransactionLimit}{' '}
                        {sellTradeAdvertisement.currency}
                      </td>
                    </tr>
                    <tr>
                      <td className="w4 pv2">Location</td>
                      <td>
                        {sellTradeAdvertisement.location}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              {requestComponent}
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}
