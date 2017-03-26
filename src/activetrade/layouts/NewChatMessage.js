import React, { Component } from 'react'

class NewChatMessage extends Component {
  render() {
    return(
      <div>
        <input type="text" placeholder="Type your message ..."/>

        <button>Send </button>
      </div>
    )
  }
}

export default NewChatMessage
