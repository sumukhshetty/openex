import React, { Component } from 'react'


class UserPresence extends Component {

  componentDidMount(){
    this.props.trackUserPresence(this.props.user.data.uid);
  }
  render() {
    return(
    <span></span>
    )
  }
}

export default UserPresence
