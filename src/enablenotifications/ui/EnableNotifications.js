import React, { Component } from 'react';

export default class EnableNotifications extends Component {

  componentWillMount() {
    // ISSUE-249 - delete this once the issue is resolved
    if (this.props.web3.web3.eth.accounts[0]) {
      console.log("we got a metamask account")
    } else {
      alert("unlock your metamask account and refresh the page")
    }
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
