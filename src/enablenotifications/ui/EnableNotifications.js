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
    console.log("EnableNotifications")
    console.log(this.props)
    try{
      if(this.props.user.profile.shownotificationrequest){
        return (
          <div>Automte needs you to give permisson to <a onClick={this.enableNotifications.bind(this)}>enable desktop notifications</a>. <a onClick={this.enableNotifications.bind(this)}>Don't Show Again</a>.
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
