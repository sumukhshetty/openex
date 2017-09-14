import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Copyright extends Component {
  render() {
    return (
      <p className="white tc tl-m tl-l">
        <span onClick={() => browserHistory.push('/html')}>&copy;</span> 2017,
        Ezether | Version 0.1.0
      </p>
    )
  }
}

export default Copyright
