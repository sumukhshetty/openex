import React from 'react'
import SubscribeFrom from 'react-mailchimp-subscribe'

const formProps = {
  action:
    '//automte.us16.list-manage.com/subscribe/post?u=410a662f4a9f3d37c04481008&amp;id=529dc9dfc8',
  messages: {
    inputPlaceholder: 'Subscribe to our email list',
    btnLabel: 'Subscribe',
    sending: 'subscribing...',
    success: 'You are subscribed. Please check your inbox.',
    error: 'Oops, please use another email address'
  },
  styles: {
    sending: {
      fontSize: 18,
      color: 'white'
    },
    success: {
      fontSize: 18,
      color: 'white'
    },
    error: {
      fontSize: 18,
      color: 'white'
    }
  }
}

export default () => (
  <SubscribeFrom
    {...formProps}
    style={{ backgroundColor: '#233b6e' }}
    className="pa3 flex mxa tc"
  />
)
