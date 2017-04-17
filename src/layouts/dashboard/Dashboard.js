import React, { Component } from 'react';
import DashboardInfoMessage from './DashboardInfoMessage';
import ActiveEscrowList from './../../activeescrowlist/layouts/ActiveEscrowList';
import AdList from './../../adlist/layouts/AdList';
import AccountEther from './../../accountEther/ui/AccountEther';
import TradeAdvertisementContainer from '../../tradeadvertisement/layouts/TradeAdvertisementContainer';

class Dashboard extends Component {
  render () {
    return (
      <section className=' bg-smoke'>
        <div className='w-75 center pv3'>
          <div>
            <div>
              <DashboardInfoMessage />
              <AccountEther />
              <ActiveEscrowList />
              <AdList />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
