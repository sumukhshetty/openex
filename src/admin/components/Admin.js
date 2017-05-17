import React, { Component } from 'react'
import { firebaseRef } from '../../index.js'
import { browserHistory } from 'react-router'

export default class Admin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      disputes: {}
    }
  }

  componentDidMount () {
    firebaseRef.database()
      .ref('/disputes')
      .once('value')
      .then(snap => {
        this.setState({ disputes: snap.val() })
      })
  }

  render () {
    // const Loading = () => (
    //   <tr className='flex cxc mxc'>
    //     <td>Disputed Trades Loading...</td>
    //   </tr>)
    console.log("components.Admin")
    console.log(this.props)
    const Disputes = Object.keys(this.state.disputes).map((dispute, index) =>
      <tr className='flex cxc' key={index}>
        <td className='fb5 tc'>{this.state.disputes[dispute].id}</td>
        <td className='fb20 tc'>{new Date(this.state.disputes[dispute].time).toDateString()}</td>
        <td className='fb10 tc'>{this.state.disputes[dispute].seller.name}</td>
        <td className='fb15 tc'>{this.state.disputes[dispute].buyer.name}</td>
        <td className='fb10 tc'>{this.state.disputes[dispute].ether}</td>
        <td className='fb10 tc'>{this.state.disputes[dispute].amount}</td>
        <td className='fb10 tc danger'> {this.state.disputes[dispute].status}</td>
        <td className='me'>
          <button onClick={() => browserHistory.push(
          this.state.disputes[dispute].tradeType === 'buy-ether' ? 'activebuyorder/' + this.state.disputes[dispute].tradeId : 'activesellorder/' + this.state.disputes[dispute].tradeId)}>
          View / Message</button>
        </td>
      </tr>
        )

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
                    { Disputes }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
