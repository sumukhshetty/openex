import React, { Component } from 'react'

import ActiveTradeContainer from './ActiveTradeContainer'
import ActiveEscrowListEmptyState from './ActiveEscrowListEmptyState'

class ActiveEscrowList extends Component {
  constructor(props){
    super(props)
    this.state ={
      activeTrades:this.props.activeTrades
    }
  }

  componentWillMount(){
    this.props.onBeforeComponentLoads(this.props.web3,this.props)
  }

    render() {
      console.log('render props');
      console.log(this.props);
      var _activeTrades = this.props.activeTrades.activeTrades
      if(_activeTrades){
        var rows = [];
        var i = 0;
        Object.entries(_activeTrades).forEach(
            ([key, value]) => {
              rows.push(<ActiveTradeContainer orderId={key} key={i} orderKey={i} tradeType={value.tradeType}/>)
              i++;
            }
        );
        return(
          <tbody>
          {rows}
          </tbody>
        )
      } else {
        return(
          <tbody>
            <ActiveEscrowListEmptyState/>
          </tbody>
        )
      }
  }
}

export default ActiveEscrowList
