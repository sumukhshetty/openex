import React from 'react'
import PaperClip from '../../images/svgReactComponents/PaperClip.js'

const NewChatMessage = (props) => (
  <form className='flex cxc bg-white br2' onSubmit={(e) => props.handleSubmit(e, props.newMessage, props.auth.uid)}>
    <PaperClip className='ph3 dim' />
    <input
      type='text'
      placeholder={`${props.email} Type your message ...`}
      className=' w-100 bn fsmall'
      value={props.newMessage}
      onChange={props.handleChange}
     />
    <input type='submit' className='green me fsmall ph3 dim pointer bg-white' value='Submit' />
  </form>
    )

export default NewChatMessage
