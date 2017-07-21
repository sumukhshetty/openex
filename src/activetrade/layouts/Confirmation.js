import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Confirmation extends Component {

  componentWillUnmount() {
    this.props.resetEtherState();
  }

  onEtherAmountChange (e) {
    e.preventDefault()
    this.setState({amountToSend:e.target.value})
  }

  handleEscrowRequest (e) {
    e.preventDefault()
    this.props.sellerAddsEther(this.state.amountToSend, this.props.activetrade.sellerUid, this.props.ethorderbook.address, this.props.web3, this.props.ethorderbook)
  }

  render () {
    var txHashUrl
    if(this.props.sendEtherState === 'waiting-for-tx-to-mine'){
      txHashUrl = "https://kovan.etherscan.io/tx/"+this.props.txhash
    }
    var contractUrl
    if(this.props.sendEtherState === 'insufficient-available-balance'){
      contractUrl = "https://kovan.etherscan.io/address/"+this.props.ethorderbook.address
    }
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo activetrade={this.props.activetrade} viewerRole={this.props.viewerRole} displayId={this.props.purchaseRequestId.slice(1,6)}/>
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.purchaseRequestId}
              sellerId={this.props.activetrade.sellerUid}
              buyerId={this.props.activetrade.buyerUid} 
              purchaseRequest={this.props.activetrade}/>
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&
              <div>
              <BuyerStepNote step={this.props.step} />
              <CancelTrade cancelTrade={this.props.buyerCancelsTrade} />
              </div>
            }
              {this.props.viewerRole === 'seller' &&
              <div>
                <SellerStepNote step={this.props.step} />
                <div className='tc'>
                  {this.props.sendEtherState === 'init' &&
                  <div>
                  <button onClick={this.props.confirmTrade} disabled={this.props.confirmTradeButtonIsDisabled} style={{'backgroundColor':this.props.confirmTradeButtonColor}}>
                   Confirm Trade
                 </button>
                <CancelTrade cancelTrade={this.props.sellerCancelsTrade}/>
                </div>
               }
                 {this.props.sendEtherState === 'sending' &&
                 <span>Please accept the transaction in MetaMask</span>}
                 {this.props.sendEtherState === 'insufficient-available-balance' &&
                 <div>
                 <span> You need to add {this.props.activetrade.etherAmount*1.01} ETH to the smart contract to initiate the trade. Please accept the transaction on Metamask</span>
                 <span> <a target="_blank" href={contractUrl}>{contractUrl}</a></span>
                 <input type='number' onChange={this.onEtherAmountChange.bind(this)} required/>
                 <button onClick={this.handleEscrowRequest.bind(this)}> submit </button>
                 </div>
               }
               {this.props.sendEtherState === 'no-eth-order-book' &&
               <div>
               <div>
                 <span>You haven't created an Order Book Contract</span>
                 </div>
                 <div>
                 <button onClick={this.props.createOrderBookContract}> Create Contract</button>
                 </div>
               </div>}
               {this.props.sendEtherState === 'waiting-for-tx-to-mine' &&
               <div>
              <div> Your contract is being mined. You can check the status of you transaction here: </div>
              <div><a target="_blank" href={txHashUrl}>{txHashUrl}</a></div>
              </div>
             }
                </div>
              </div>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Confirmation
