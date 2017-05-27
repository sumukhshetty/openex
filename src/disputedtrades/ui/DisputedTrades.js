import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class DisputedTrades extends Component {

  render () {
    console.log("DisputedTrades")
    console.log(this.props)
    if(this.props.user){
      if(this.props.user.profile){
        if (this.props.user.profile !== null){
          if (this.props.user.profile.isAdmin){
            console.log("user is Admin")
            return (
              <div>
                <a onClick={()=>browserHistory.push('/admin')}> Go to admin</a>
              </div>
            );
          } else {
            return (<div></div>)  
          }
        } else {
          return (<div></div>)
        }
      } else {
        return (<div></div>)
      }
      return (<div></div>)
    } else {
      return(<div></div>)
    }
  }
}

export default DisputedTrades;
