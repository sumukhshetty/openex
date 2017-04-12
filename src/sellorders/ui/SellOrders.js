import React, { Component } from 'react';
import * as _ from 'lodash';

import SellOrdersListContainer from './SellOrdersListContainer';
import SellOrderTradeDetailsHeader from './SellOrderTradeDetailsHeader';

class SellOrders extends Component {
  constructor (props) {
    super(props);

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      sellorders: this.props.sellorders
    };
  }

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.state.user);
  }

  render () {
    var sellorders = this.props.sellorders;
    const SellOrdersLoadingDisplay = () => (<div> loading </div>);
    return (
      <div>
        <SellOrderTradeDetailsHeader />
        <div>
          { sellorders.sellorders ? <SellOrdersListContainer /> : <SellOrdersLoadingDisplay />}
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
export default SellOrders;
=======
export default SellOrder;
>>>>>>> Add sell orders list and details prototype
