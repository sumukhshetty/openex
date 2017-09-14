import React from 'react'
import PropTypes from 'prop-types'
import Bell from '../images/svgReactComponents/Bell'
import { connect } from 'react-redux'

const NotificationButtonInHeader = ({ notifications, showNotifications }) => {
  let unseenNotifications = null
  if (notifications.data) {
    unseenNotifications = Object.values(notifications.data).filter(
      message => message.seen === true
    )
  }
  return (
    <div className="flex">
      <Bell action={showNotifications} className="pointer" />
      {unseenNotifications &&
        <div
          className="bigRedDot"
          onClick={showNotifications}
          className="pointer"
        />}
    </div>
  )
}

NotificationButtonInHeader.propTypes = {
  notifications: PropTypes.object,
  showNotifications: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications,
    showNotifications: ownProps.showNotifications
  }
}

export default connect(mapStateToProps)(NotificationButtonInHeader)
