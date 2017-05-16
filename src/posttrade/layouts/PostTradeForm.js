import React, { Component } from 'react'
import PostTradeFormContainer from './../ui/PostTradeFormContainer'

class PostTrade extends Component {
  render () {
    return (
      <div className='bg-smoke'>
        <div className='w-75 center pv3'>
          <PostTradeFormContainer uid={this.props.authData.uid} />
        </div>
      </div>
    )
  }
}

export default PostTrade
