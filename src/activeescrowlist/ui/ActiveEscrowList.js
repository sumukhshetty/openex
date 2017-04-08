import React, { Component } from 'react'

import ActiveTrade from './../../activetrade/layouts/ActiveTrade'
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
      var _activeTrades = this.props.activeTrades.activeTrades
      if(_activeTrades){
        var rows = [];
        Object.entries(_activeTrades).forEach(
            ([key, value]) => {
              rows.push(<ActiveTrade orderId={key} key={key}/>)}
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