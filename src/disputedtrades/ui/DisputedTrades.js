import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class DisputedTrades extends Component {

  render () {
    if(this.props.user){
      if(this.props.user.profile){
        if (this.props.user.profile !== null){
          if (this.props.user.profile.isAdmin){
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
