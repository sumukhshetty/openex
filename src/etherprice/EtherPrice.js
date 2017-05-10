import React, { Component } from 'react'


class EtherPrice extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  getEtherPrice() {
    this.props.onEtherPriceComponentLoad(this.props.user.data.uid)
  }

  render() {
    if(this.props.user.data) {
      setInterval(() => {
        this.getEtherPrice();
      }, 30000)
    }
    return(
    <span></span>
    )
  }
}

export default EtherPrice
