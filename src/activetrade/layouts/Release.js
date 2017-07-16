import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import DisputeTrade from '../../admin/disputeContainer'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Release extends Component {

  render () {
    var txHashUrl
    if(this.props.sendEtherState === 'waiting-for-tx-to-mine'){
      txHashUrl = "https://kovan.etherscan.io/tx/"+this.props.txhash
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
                    <DisputeTrade 
                      viewerRole={this.props.viewerRole} 
                      activetrade={this.props.activetrade} 
                      raiseDispute={this.props.buyerRaisesDispute}/>
                  </div>}
                {this.props.viewerRole === 'seller' &&
                  <div>
                    <SellerStepNote step={this.props.step} />
                    <div className='tc'>
                      {this.props.sendEtherState === 'init' &&
                        <div>
                        <button onClick={this.props.releaseEther}>
                          Release Ether
                        </button>
                        <DisputeTrade 
                          viewerRole={this.props.viewerRole} 
                          activetrade={this.props.activetrade} 
                          raiseDispute={this.props.sellerRaisesDispute}/>
                        </div>
                      }
                      {this.props.sendEtherState === 'sending' &&
                        <span>Please accept the transaction in MetaMask</span>}
                      {
                        this.props.sendEtherState === 'waiting-for-tx-to-mine' &&
                         <div>
                        <div> Your transaction is being mined. You can check the status of you transaction here: </div>
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

export default Release
