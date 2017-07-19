import React, { Component } from 'react';

export default class EnableNotifications extends Component {

  componentWillMount() {
    this.props.onBeforeComponentLoad(this.props.user);
  }

  enableNotifications(){
    this.props.givePermission(this.props.user)
  }

  dontShowAgain(){
    this.props.dontShowAgain(this.props.user)
  }

  render () {
    try{
      if(this.props.user.profile.shownotificationrequest){
        return (
          <div>Receive <a onClick={this.enableNotifications.bind(this)}>desktop notifications</a> to speed up communication. <a onClick={this.enableNotifications.bind(this)}>Don't Show Again</a>.
          </div>
          )
      } else {
        return(
          <div></div>
        )  
      }

    } catch (e){
      return(
        <div></div>
      )
    }
  }
}
