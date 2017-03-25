import React, { Component } from 'react'
import TradeFeedbackHeader from './TradeFeedbackHeader'
import TradeFeedbackRating from './TradeFeedbackRating'
import TradeFeebackMessage from './TradeFeebackMessage'
import TradeFeebackButton from './TradeFeebackButton'


class TradeFeedbackContainer extends Component {
  render() {
    return(
      <div>
        <TradeFeedbackHeader />
        <TradeFeedbackRating />
        <TradeFeebackMessage />
        <TradeFeebackButton />
      </div>
    )
  }
}

export default TradeFeedbackContainer
