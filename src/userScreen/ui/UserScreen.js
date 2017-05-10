import React, { Component } from 'react';
import Trustworthiness from '../../generic-components/tables/Trustworthiness';
import LastOnline from '../../generic-components/tables/LastOnline';
import Header from '../../generic-components/tables/Header';

export default class UserScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      volume: 100,
      buyingFrom: 'Victoria Padilla',
      trades: 4,
      partners: 4,
      feedback: 100,
      firstPurchase: '2 weeks, 5 days',
      accountCreated: '4 months, 3 weeks',
      lastSeen: 'Just Now',
      language: 'English',
      emailVerified: '4 months, 3 weeks',
      phoneVerified: '4 months, 3 weeks',
      trust: 2,
      blocks: 0,
      activeTrades: [
        {
          name: 'Victoria Padilla',
          currency: 'EUR',
          paymentMethod: 'UPI',
          price: 1350,
          minTransactionLimit: 0,
          maxTransactionLimit: 21194,
          lastTransfer: '26 Oct 2017',
          trustworthiness: 'Sufficient',
          lastOnline: 'active',
          buyOrSell: 'Sell'
        },
        {
          name: 'David Washington',
          currency: 'USD',
          paymentMethod: 'IMPS',
          price: 1250,
          minTransactionLimit: 100,
          maxTransactionLimit: 1120,
          lastTransfer: '2 Oct 2017',
          trustworthiness: 'Perfect',
          lastOnline: '02 Dec 2016',
          buyOrSell: 'Buy'
        }
      ]
    };
  }

  componentWillMount(){
    console.log("ui.UserScreen.componentWillMount")
    console.log(this.props)
    this.props.onBeforeComponentLoad(this.props.userScreenUid)
  }

  componentWillUnmount(){
    console.log("ui.UserScreen.componentWillUnmount")
  }

  render () {
    console.log("ui.UserScreen.render")
    console.log(this.props)
    const rows = this.state.activeTrades.map(trade =>
      <tr className='flex cxc list bg-white pa3 mv2 gray'>
        <td className='fb20' >{trade.name} - {trade.currency}</td>
        <td className='fb10 tc' >{trade.paymentMethod}</td>
        <td className='fb15 tc' >{trade.price} INR</td>
        <td className='fb5 tc' >{trade.minTransactionLimit} - {trade.maxTransactionLimit}</td>
        <td className='fb15 tc' >{trade.lastTransfer}</td>
        <Trustworthiness trustLevel={'Sufficent'} />
        <LastOnline time={trade.lastOnline} />
        <button>{trade.buyOrSell}</button>
      </tr>);

    if(this.props.userScreen.data){
      return (
        <div className='w-100 bg-smoke'>
          <div className='w-75 center pv3'>
            <h1 className='pv1'>{this.props.userScreen.data.username}</h1>
            <div>
              <h2>User Information</h2>
              <div className='w-100'>
                <ul className='lh-copy flex col wrap w-100 vh-50 list'>
                  <tr className='w-50 bg-bone flex cxc'>
                    <td className='w4 pv2'>Trade Volume</td>
                    <td className='green pl3'>{this.props.userScreen.data.tradeVolume} Ether</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Confirmed Trades</td>
                    <td className='pl3'>{this.props.userScreen.data.numberOfTrades.toString()}</td>
                  </tr>
                  {/*<tr className='w-50'>
                    <td className='w4 pv2'>Traded with</td>
                    <td className='pl3'>with {this.state.partners} different partners</td>
                  </tr>*/}
                  <tr className='w-50'>
                    <td className='w4 pv2'>Feedback Score</td>
                    <td className='pl3'>{this.props.userScreen.data.avgFeedback}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>First Purchase</td>
                    <td className='pl3'>{this.props.userScreen.data.firstPurchase} ago</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Account Created</td>
                    <td className='pl3'>{this.props.userScreen.data.accountCreated.toString()} ago</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Last Seen</td>
                    <td className='pl3'>{this.props.userScreen.data.lastOnline.toString()} ago</td>
                  </tr> 
{/*                  <tr className='w-50'>
                    <td className='w4 pv2'>Language</td>
                    <td className='pl3'>{this.state.language}</td>
                  </tr>*/}
                  <tr className='w-50'>
                    <td className='w4 pv2'>Email</td>
                    <td className='pl3'>Verified {this.props.userScreen.data.verifiedEmail.toString()}</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Phone Number</td>
                    <td className='pl3'>Verified {this.props.userScreen.data.verifiedPhoneNumber.toString()}</td>
                  </tr>
                  {/*<tr className='w-50'>
                    <td className='w4 pv2'>Trust</td>
                    <td className='pl3'>{this.state.accountCreated} people</td>
                  </tr>
                  <tr className='w-50'>
                    <td className='w4 pv2'>Blocks</td>
                    <td className='pl3'>{this.state.language} people</td>
                  </tr>*/}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <div className='mt5'>
{/*                  <h2>Active Trade Advertisements</h2>
                  <table className='w-100'>
                    <Header />
                    <tbody>
                      {rows}
                    </tbody>
                  </table>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>Loading ... </div>
        )
    }
  }
}
