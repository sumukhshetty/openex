import React, { Component } from 'react';
import * as _ from 'lodash';

import BuyOrdersListContainer from './BuyOrdersListContainer';
import BuyOrderTradeDetailsHeader from './BuyOrderTradeDetailsHeader';

class BuyOrder extends Component {
  constructor (props) {
    super(props);

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      buyorders: this.props.buyorders
    };
  }

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.state.user);
  }

  render () {
    var buyorders = this.props.buyorders;
    const BuyOrdersLoadingDisplay = () => (<div> loading </div>);
    return (
      <div>
        <BuyOrderTradeDetailsHeader />
        <div>
          { buyorders.buyorders ? <BuyOrdersListContainer /> : <BuyOrdersLoadingDisplay />}
        </div>
      </div>
    );
  }
}

export default BuyOrder;
