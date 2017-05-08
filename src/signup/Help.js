import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Help extends Component {

  render() {
    return(
      
      <footer>
        <a onClick={()=>browserHistory.push('password/reset')}>Forgot Password?</a>
      </footer>
    )
  }
}

export default Help
