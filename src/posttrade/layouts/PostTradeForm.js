import React, { Component } from 'react'
import PostTradeFormContainer from './../ui/PostTradeFormContainer'

class PostTrade extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Post Trade</h1>
            <p>Post a trade here.</p>
            <PostTradeFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default PostTrade
