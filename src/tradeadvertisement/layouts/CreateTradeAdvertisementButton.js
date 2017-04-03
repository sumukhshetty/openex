import React, { Component } from 'react'
import {Link} from 'react-router'
//TODO import HelpContainer

class CreateTradeAdvertisementButton extends Component {
  render() {
    return(
      <Link to="/posttrade"
          className="pure-button pure-button-primary create-ad-button">+ Create Advertisement</Link>
    )
  }
}

export default CreateTradeAdvertisementButton
