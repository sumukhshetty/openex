import React, { Component } from 'react'
import { EditBuyForm } from './EditBuyForm'
import { EditSellForm } from './EditSellForm'
import MetaMaskWaitModal from './../../generic-components/metamaskmodal/MetaMaskWaitModal'

class EditTradeAdvertisementForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      etherPrice: this.props.etherPrice,
      postTradeDetails: this.props.tradeAdvertisement,
      buyFormBool: false,
      user: this.props.user,
      uid: this.props.uid,
      sendEtherState: this.props.sendEtherState
    }
    this.onPaymentMethodChange = this.onPaymentMethodChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      buyFormBool: (this.props.tradeAdvertisementType === 'buy-ether' ? true : false),
    })
  }


  onInputChange (event) {
    var _postTradeDetails = this.state.postTradeDetails
    if (event.target.id === 'location') {
      _postTradeDetails['location'] = event.target.value
    } else if (event.target.id === 'margin') {
      _postTradeDetails['margin'] = event.target.value
    } else if (event.target.id === 'equation') {
      _postTradeDetails['equation'] = event.target.value
    } else if (event.target.id === 'amount') {
      _postTradeDetails['amount'] = event.target.value
    } else if (event.target.id === 'bankInformation') {
      _postTradeDetails['bankInformation'] = event.target.value
    } else if (event.target.id === 'minTransactionLimit') {
      _postTradeDetails['minTransactionLimit'] = event.target.value
    } else if (event.target.id === 'maxTransactionLimit') {
      _postTradeDetails['maxTransactionLimit'] = event.target.value
    } else if (event.target.id === 'termsOfTrade') {
      _postTradeDetails['termsOfTrade'] = event.target.value
    } else if (event.target.id === 'activeTrade') {
      if (event.target.value === 'true') {
        _postTradeDetails['active'] = true
      } else {
        _postTradeDetails['active'] = false
      }
    }
    this.setState({ postTradeDetails: _postTradeDetails })
  }


  onPaymentMethodChange (event) {
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {paymentMethod: event.target.value}
      )
    this.setState({postTradeDetails: _postTradeDetails})
  }

  onCurrencyChange (event) {
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {currency: event.target.value}
      )
    this.setState({postTradeDetails: _postTradeDetails})
  }

  handleSubmit (event) {
    event.preventDefault()
    var now = new Date()
    var marginMultiplier = (1 + (parseInt(this.state.postTradeDetails.margin, 10) * 0.01))
    var price
    if (this.props.etherPrice.data){
      price =(this.props.etherPrice.data * marginMultiplier).toFixed(2)
    } else {
      price = '-'
    }
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {lastUpated: now.toUTCString(),
        status: 'Initiated',
        //margin: margin,
        price: price
      }
      )
    this.props.updateTradeAdvertisement(
      _postTradeDetails,
      this.props.tradeAdvertisementId,
      this.props.tradeAdvertisementType, 
      this.props.user)
  }

  render () {
    var isAdActive
    if (this.state.postTradeDetails.active){
      isAdActive = true
    } else{
      isAdActive = false
    }
    return (
      <div>
        <form className='mv3' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset >
            <legend className='b f4 mv3'>Trade Information</legend>
                <div className='flex pa0 mv3'>
                  <p className='w5'>I want to...</p>
                  <div className='flex col'>
                    <label htmlFor='activeTrade'><input id='activeTrade' name='activeTrade' type='radio' value='true' onChange={this.onInputChange.bind(this)}
                      className='mr2' checked={isAdActive} />list my advertisement</label>
                    <label htmlFor='activeTrade'> <input id='activeTrade' name='activeTrade' type='radio' value='false' onChange={this.onInputChange.bind(this)}
                      className='mr2' checked={!isAdActive}/>unlist my advertisement</label>
                  </div>
                  <span className='measure-narrow fw1 i pa0 me'>
                    If you wish to list your advertisment or if you want to unlist it.
                  </span>
                </div>

            <div className='flex mv3'>
              <label htmlFor='location' className='w5' >Location</label>
              <input id='location' name='location' type='text' value={this.props.tradeAdvertisement.location} onChange={this.onInputChange.bind(this)}
                placeholder='Enter a Location' className='w5 h-100' required />
              <span className='measure-narrow fw1 i pa0 me'>For online trade you need to specify the country. For local trade, please specify a city, postal code or street name.</span>
            </div>

            {this.state.buyFormBool
              && <div className='flex mb3'>
                <label
                  htmlFor='buyerAddress'
                  className='w5'>Buyer Address</label>
                <textarea
                  id='buyerAddress'
                  type='textArea'
                  rows='4'
                  value={this.props.tradeAdvertisement.buyerAddress}
                  placeholder='Please make sure you are logged into metamask in your chrome browser.'
                  className='w5'
                  disabled />
              </div>
            }

            <div className='flex mv3'>
              <label htmlFor='margin' className='w5' >Margin</label>
              <div className='flex col'>
                <div className='flex w5 h-100'>
                  <input id='margin' name='margin' type='number' value={(this.props.tradeAdvertisement.margin)} onChange={this.onInputChange.bind(this)} className='br--white'
                    required />
                  <button className='ftiny br0 bg-gray bl--gray b--blue ba gray'>%</button>
                </div>
                <small className='f6 fw3 mt3'>Your price: <span className='green'>{this.props.etherPrice ? (this.props.etherPrice.data * (1 + (this.props.tradeAdvertisement.margin * 0.01))).toFixed(2) : 'Getting price...'} {this.props.user.profile.currency + '/ETH'}</span></small>
                <small className='f6 fw3 mt3'>Current market value <span className='green'>{this.props.etherPrice ? this.props.etherPrice.data : 'Getting price...'} {this.props.user.profile.currency + '/ETH'}</span></small>
              </div>

              <span className='measure-narrow fw1 i pa0 me'>Margin you want over the ether market price. Use a negative value for buying or selling under the market price to attract more contracts. For more complex pricing edit the price equation directly.</span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='paymentMethod' className='w5'>Payment Method</label>
              <select id='paymentMethod' defaultValue={this.props.tradeAdvertisement.paymentMethod} name='paymentMethod' onChange={this.onPaymentMethodChange.bind(this)}
                className='w5'required>
                <option value='National Bank' >National Bank</option>
                <option value='cash'>cash</option>
                <option value='mobile'>mobile</option>
              </select>
            </div>

            {
              (this.state.buyFormBool)
                ? <EditBuyForm
                  onChangeProp={this.onInputChange.bind(this)}
                  amount={this.state.postTradeDetails.amount}
                  paymentMethod={this.state.postTradeDetails.paymentMethod}
                  onPaymentMethodChange={this.onPaymentMethodChange.bind(this)}
                  onCurrencyChange={this.onCurrencyChange.bind(this)}
                  bankInformation={this.state.postTradeDetails.bankInformation}
                  minTransactionLimit={this.state.postTradeDetails.minTransactionLimit}
                  maxTransactionLimit={this.state.postTradeDetails.maxTransactionLimit}
                  termsOfTrade={this.state.postTradeDetails.termsOfTrade}
                  currency={this.state.user.profile.currency} />
              : <EditSellForm
                onChangeProp={this.onInputChange.bind(this)}
                currency={this.props.user.profile.currency}
                amount={this.state.postTradeDetails.amount}
                onPaymentMethodChange={this.onPaymentMethodChange.bind(this)}
                paymentMethod={this.state.postTradeDetails.paymentMethod}
                onCurrencyChange={this.onCurrencyChange.bind(this)}
                bankInformation={this.state.postTradeDetails.bankInformation}
                minTransactionLimit={this.state.postTradeDetails.minTransactionLimit}
                maxTransactionLimit={this.state.postTradeDetails.maxTransactionLimit}
                termsOfTrade={this.state.postTradeDetails.termsOfTrade} />
            }

            {
              (this.props.sendEtherState === 'sending' && <MetaMaskWaitModal />)
            }

            <div className='flex mv3'>
              <label className='w5 ' />
              <input
                type='submit'
                className='mv5'
                value='Publish Advertisement' />
            </div>

          </fieldset>
        </form>
      </div>
    )
  }
}

export default EditTradeAdvertisementForm
