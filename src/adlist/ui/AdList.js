import React, { Component } from 'react'

import ActiveAd from './ActiveAd'
import AdListEmptyState from './AdListEmptyState'

class AdList extends Component {
  constructor(props){
    super(props)
    this.state ={
      activeAds:this.props.activeAds
    }
  }

  componentWillMount(){
    this.props.onBeforeComponentLoads(this.props.web3,this.props)
  }

    render() {
      var _activeAds = this.props.activeAds.activeAds
      if(_activeAds){
        var rows = [];
        Object.entries(_activeAds).forEach(
            ([key, value]) => {
              rows.push(<ActiveAd orderId={key} key={key}/>)}
        );
        return(
          <tbody>
          {rows}
          </tbody>
        )
      } else {
        return(
          <tbody>
            <AdListEmptyState/>
          </tbody>
        )
      }
  }
}

export default AdList
