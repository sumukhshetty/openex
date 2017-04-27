import React, { Component } from 'react'


class EtherPrice extends Component {

  componentDidMount(){
    let toSymbols = 'INR'
    this.props.onEtherPriceComponentLoad(toSymbols)
  }

  render() {
    return(
    <span></span>
    )
  }
}

export default EtherPrice
