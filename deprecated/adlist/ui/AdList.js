import React, { Component } from 'react'

import ActiveAdContainer from './ActiveAdContainer'
import AdListEmptyState from './AdListEmptyState'

class AdList extends Component {
  constructor(props){
    super(props)
    this.state ={
      activeAds:this.props.activeAds
    }
  }

  componentWillMount(){
    console.log("ui.AdList.componentWillMount")
    console.log(this.props)
    // ISSUE-231-7: Change this.props to this.props.user, this should be called
    // in user/userActions.startListeningUserAuth
    this.props.onBeforeComponentLoads(this.props.web3,this.props)
  }

    render() {
      // ISSUE-231-9: this.props.activeAds.activeAds should be changed to this.props.activeAds.data
      var _activeAds = this.props.activeAds.activeAds
      if(_activeAds){
        var rows = [];
        Object.entries(_activeAds).forEach(
            ([key, value]) => {
              // ISSUE-231-10: the orderId should change to tradeAdvertisementId
              rows.push(<ActiveAdContainer orderId={key} key={key} tradeType={value.tradeType}/>)}
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
