import React from 'react'
import PropTypes from 'prop-types'
import { VisibleOnlyAuth } from '../util/wrappers.js'
import { Link } from 'react-router'
import Bell from '../images/svgReactComponents/Bell'
import NotificationsContainer from '../notifications/ui/NotificationsContainer'
import ezetherlogowhite from '../images/ezether_logo.png'
import LogoutButtonContainer from '../user/ui/logoutbutton/LogoutButtonContainer'

const AuthHeader = VisibleOnlyAuth(
  ({ notificationStatus, removeNotifications, showNotifications }) => {
    return (
      <div className="tr pt3 menu mt0 bg-blue">
        <div className="w-75 center">
          {notificationStatus && (
            <NotificationsContainer close={removeNotifications} />
          )}
          <div className="pure-g flex mxb cxc ">
            <div className="pure-u-1-4 brand">
              <Link to="/">
                <img
                  className="brand"
                  src={ezetherlogowhite}
                  alt="EZ Ether"
                  width="244px"
                  height="100px"
                />
              </Link>
            </div>
            <div className="flex mxe cxc">
              <Bell action={showNotifications} />
              <LogoutButtonContainer />
            </div>
          </div>
          <nav className="pure-menu pure-menu-horizontal">
            <ul className="flex mxb ma0 pa0">
              <li className="pure-menu-item">
                <Link
                  data-test="dashboardButton"
                  to="/dashboard"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link
                  data-test="buyEtherNavButton"
                  to="/buyether"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Buy
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link
                  to="/sellether"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Sell
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link
                  data-test="postATradeButton"
                  to="/posttrade"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Post a Trade
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link
                  to="/help"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link
                  to="/guide"
                  activeStyle={{
                    color: 'white',
                    borderBottom: '2px solid white'
                  }}
                >
                  Guide
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
)

AuthHeader.propTypes = {
  notificationStatus: PropTypes.bool.isRequired,
  removeNotifications: PropTypes.func.isRequired,
  showNotifications: PropTypes.bool.isRequired
}

export default AuthHeader
