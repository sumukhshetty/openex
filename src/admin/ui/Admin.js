import React, { Component } from 'react'
import AdminRow from './AdminRow'
import ProcessKycRow from './ProcessKycRow'

export default class Admin extends Component {

  componentWillMount (){
    this.props.onBeforeComponentLoad()
  }

/*  componentWillUnmount(){
    this.props.onBeforeComponentWillUnmount()
  }
*/
  render () {
    var purchaserequests = this.props.admin.purchaserequests
    if(this.props.user.profile){
      if(this.props.user.profile.isAdmin && this.props.disputedtrades.data){
        var rows = []
        Object.entries(this.props.disputedtrades.data).forEach(([key, value]) =>{
          var purchaserequest = purchaserequests[value.country][key]
          var time
          if (purchaserequest.status === 'Seller Raised Dispute'){
            time = purchaserequest.sellerraisesdisputetime
          } else {
            time = purchaserequest.buyerraisesdisputetime
          }
          rows.push(<AdminRow 
                    index={key}
                    key={key}
                    purchaseRequestId={key}
                    time={time}
                    purchaserequest={purchaserequest}
                    countryCode={value.country}
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
                   <p className='pv3 measure-wide'>Version 1.0.0</p>
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
