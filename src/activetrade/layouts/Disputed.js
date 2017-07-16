import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'
import AdminStepNote from './../ui/AdminStepNote'

class Disputed extends Component {

  render () {
    console.log("Disputed.render")
    console.log(this.props)
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
              </div>
            }
              {this.props.viewerRole === 'seller' &&
              <div className='tc'>
                <SellerStepNote step={this.props.step} />
                <button onClick={this.props.releaseEther}>
                  Release Ether
                </button>                
              </div>}
            {this.props.viewerRole === 'arbiter' &&
              <div>
              <AdminStepNote 
                releaseToBuyer={this.props.releaseToBuyer} 
                releaseToSeller={this.props.releaseToSeller}
                assignArbiter={this.props.assignArbiter}
              />
              </div>
            }
          </div>
        </div>
        </div>
      </section>
    )
  }
}

export default Disputed
