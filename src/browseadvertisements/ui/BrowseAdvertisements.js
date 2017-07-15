import React, { Component } from 'react';
import * as _ from 'lodash'

export default class BrowseAdvertisements extends Component {

  componentWillMount() {
    console.log('BrowseAdvertisements.componentWillMount')
    console.log(this.props)
  }

  
  render () {
    console.log('BrowseAdvertisements.render')
    console.log(this.props)
    const buyrows = _.map(this.props.buytradeadvertisements,function(buytradeadvertisement, key){
      console.log('mapping through buytradeadvertisements')
      console.log(buytradeadvertisement)
    })
    return(<div>
      <div>
      BrowseAdvertisements
      </div>
      <div>
      Sell Trade Advertisements
      </div>
      <div>
      Buy Trade Advertisements
      </div>
      </div>)
  }
}
