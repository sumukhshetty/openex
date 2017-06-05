import React, { Component } from 'react'
import AdminRow from './AdminRow'
import ProcessKycRow from './ProcessKycRow'

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
    var purchaserequests = this.props.purchaserequests.data

    if(this.props.user.profile){
      if(this.props.user.profile.isAdmin && this.props.disputedtrades.data){
        const rows = Object.keys(this.props.disputedtrades.data).map((purchaseRequestId, index)=>{
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
        var kycRows = [];
        if (this.props.processkyc.data){
          Object.entries(this.props.processkyc.data).forEach((countryData)=>{
            var countryCode = countryData[0]
            var userUids = countryData[1]
            Object.keys(userUids).map((userUid, index)=>{
              kycRows.push(<ProcessKycRow
                index={userUid}
                key={userUid}
                userUid={userUid}
                country={countryCode}
                />)
            })
          })
          
        }

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
                          { kycRows ? kycRows : null}
                          
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
