import { connect } from 'react-redux'
import { firebaseRef } from '../index.js'
import React, { Component } from 'react'
import CancelIcon from '../images/svgReactComponents/Cancel'
import ClearIcon from '../images/svgReactComponents/Clear'
import ChatIcon from '../images/svgReactComponents/Chat'
import CompleteIcon from '../images/svgReactComponents/Complete'
import JoinedIcon from '../images/svgReactComponents/Joined'
import { browserHistory } from 'react-router'
const moment = require('moment')

// there was only one action so I just placed it here, I will create a seperate actions file if we create more actions
const setUserNotifications = notificationsPayload => ({
  type: 'GET_USER_NOTIFICATIONS',
  payload: notificationsPayload
})

class Notifications extends Component {
  state = {
    unseenNotifications: null
  }
  componentDidMount () {
    this.getNotifications()
  }

  getNotifications = () => {
    let unseenNotifications = Object.keys(this.props.notifications.data)
      .filter(message => this.props.notifications.data[message].seen === false)
      .sort(
        (a, b) =>
          this.props.notifications.data[b].createdAt -
          this.props.notifications.data[a].createdAt
      )
    this.setState({
      unseenNotifications
    })
  }

  handleClearAllNotifications = () => {
    this.state.unseenNotifications.forEach(notification =>
      firebaseRef
        .database()
        .ref(`/notifications/${this.props.user.data.uid}/${notification}`)
        .update({ seen: true })
        .then(() =>
          firebaseRef
            .database()
            .ref(`/notifications/${this.props.user.data.uid}`)
            .on('value', snap => this.props.setUserNotifications(snap.val()))
        )
        .then(() => this.getNotifications())
        .then(this.props.close)
    )
  }

  render () {
    return (
      <div className='flex mxe absolute--fill fixed bg-black-80 z-1'>
        <div className='w5 bg-smoke pa3 overflow-y-auto'>
          <div className='flex mxb cxc coal'>
            <CancelIcon action={this.props.close} />
            <div className='ms pl3'>{`${this.state.unseenNotifications && this.state.unseenNotifications.length} Unread
Notifications`}</div>
            <ClearIcon action={this.handleClearAllNotifications} />
          </div>
          <div className='flex col'>
            {this.state.unseenNotifications &&
              this.state.unseenNotifications.map(notification => (
                <SingleNotification
                  key={notification}
                  notificationId={notification}
                  uuid={this.props.user.data.uid}
                  time={this.props.notifications.data[notification].createdAt}
                  name={this.props.notifications.data[notification].title}
                  type={this.props.notifications.data[notification].type}
                  message={this.props.notifications.data[notification].body}
                  purchaseRequestId={
                    this.props.notifications.data[notification]
                      .purchaseRequestId
                  }
                  close={this.props.close}
                />
              ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    notifications: state.notifications
    // a user's notifications get loaded in when they login on line 168 of user/userActions
  }
}

const NotificationsContainer = connect(mapStateToProps, {
  setUserNotifications
})(Notifications)

export default NotificationsContainer

class SingleNotification extends Component {
  goToTrade = () => {
    this.props.close()
    this.markNotificationSeen(this.props.notificationId)
    var url = '/activetrade/' + this.props.purchaseRequestId
    browserHistory.push(url)
  }

  markNotificationSeen = notificationId => {
    firebaseRef
      .database()
      .ref(`/notifications/${this.props.uuid}/${this.props.notificationId}`)
      .update({ seen: true })
  }

  render () {
    let icon

    switch (this.props.type) {
      case 'buyerconfirmspayment':
        icon = <ChatIcon />
        break
      case 'buyercreatespurchaserequest':
        icon = <CompleteIcon />
        break
      case 'sellercreatespurchaserequest':
        icon = <CompleteIcon />
        break
      case 'sellerconfirmstrade':
        icon = <CompleteIcon />
        break
      case 'sellerreleasesether':
        icon = <CompleteIcon />
        break
      case 'arbiterreleasestoseller':
        icon = <CompleteIcon />
        break
      case 'arbiterreleasestobuyer':
        icon = <CompleteIcon />
        break
      case 'joined':
        icon = <JoinedIcon />
        break
      default:
        icon = <ChatIcon />
    }

    return (
      <div
        onClick={this.goToTrade}
        className='bg-white pa2 mv3 flex col coal pointer'
      >
        <div className='flex cxc mxb'>
          {icon}
          <p className='b ma0 pa0'>{this.props.name}</p>
          <small className='gray'>{moment(this.props.time).fromNow()}</small>
        </div>
        {this.props.message && <p className='gray'>{this.props.message}</p>}
      </div>
    )
  }
}
