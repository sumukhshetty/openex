import React, { Component } from 'react'
import AdminRow from './AdminRow'
export default class Admin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      disputes: {}
    }
  }
  componentWillMount (){
    this.props.onBeforeComponentLoad()
  }

  componentWillUnmount(){
    this.props.onBeforeComponentWillUnmount()
  }


  render () {
    console.log("components.Admin")
    console.log(this.props)
    var purchaserequests = this.props.purchaserequests.data

    if(this.props.user.profile){
      if(this.props.user.profile.isAdmin && this.props.disputedtrades.data){
        const rows = Object.keys(this.props.disputedtrades.data).map((purchaseRequestId, index)=>{
          console.log(purchaseRequestId, index)
          console.log(purchaserequests[purchaseRequestId])
          var purchaserequest = purchaserequests[purchaseRequestId]
          var time
          if (purchaserequest.status === 'Seller Raised Dispute'){
            time = purchaserequest.sellerraisesdisputetime
          } else {
            time = purchaserequest.buyerraisesdisputetime
          }
          return (<AdminRow 
                    index={index}
                    key={index}
                    purchaseRequestId={purchaseRequestId}
                    time={time}
                    purchaserequest={purchaserequest}
                  />)
        })

          return (
            <section className='bg-smoke'>
              <div className='w-75 center pv3'>
                <div>
                  <div>
                    <p className='b pv3 measure-wide'>Welcome to the Admin Dashboard</p>
                    <div className='pt3'>
                      <table>
                        <thead>
                          <tr>
                            <th className='fb5 tc'>#</th>
                            <th className='fb20 tc'>Created at</th>
                            <th className='fb10 tc'>Seller</th>
                            <th className='fb15 tc'>Buyer</th>
                            <th className='fb10 tc'>Ether</th>
                            <th className='fb10 tc'>Amount</th>
                            <th className='fb10 tc'>Status</th>
                            <th className='fb10 tc'>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          { rows }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
      } else {
        return (
          <div>Exit immediately</div>
          )
      }
    } else {
      return (
        <div>loading</div>)
    }

  }
}
