import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Confirmation extends Component {

  constructor(props){
    super(props)
    this.state={amountToSend:0}
  }

  componentWillUnmount() {
    this.props.resetEtherState();
  }

  onEtherAmountChange (e) {
    e.preventDefault()
    this.setState({amountToSend:e.target.value})
  }

  handleEscrowRequest (e) {
    e.preventDefault()
    this.props.sellerAddsEther(this.state.amountToSend, this.props.activetrade.sellerUid, this.props.sellerInterface.address, this.props.web3, this.props.sellerInterface, this.props.orderDB)
  }

  render () {
    var txHashUrl
    if(this.props.sendEtherState === 'waiting-for-tx-to-mine'){
      txHashUrl = "https://etherscan.io/tx/"+this.props.txhash
    }
    var contractUrl
    if(this.props.sendEtherState === 'insufficient-available-balance'){
      contractUrl = "https://etherscan.io/address/"+this.props.sellerInterface.address
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
