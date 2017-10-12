import React from 'react'
import PropTypes from 'prop-types'
import Bell from '../images/svgReactComponents/Bell'
import { connect } from 'react-redux'

const NotificationButtonInHeader = ({ notifications, showNotifications }) => {
  let unseenNotifications = []

  if (notifications.data) {
    unseenNotifications = Object.values(notifications.data).filter(
      message => message.seen === false
    )
  }

  return (
    <div className='flex pointer' onClick={showNotifications}>
      <Bell action={showNotifications} className='pointer' />
      {unseenNotifications.length > 0 && <div className='bigRedDot pointer' />}
    </div>
  )
}

NotificationButtonInHeader.propTypes = {
  notifications: PropTypes.object.isRequired,
  showNotifications: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications,
  showNotifications: ownProps.showNotifications
})

export default connect(mapStateToProps)(NotificationButtonInHeader)
