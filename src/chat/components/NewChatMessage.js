import React from 'react'
//import PaperClip from '../../images/svgReactComponents/PaperClip.js'

const NewChatMessage = (props) => (
  <form className='flex cxc bg-white br2' onSubmit={(e) => props.handleSubmit(e, props.newMessage, props.auth.uid, props.tradeId)}>
    <input
      type='text'
      placeholder={`Type here to chat...`}
      className=' w-100 bn fsmall mr2'
      value={props.newMessage}
      onChange={props.handleChange}
     />
    <input
      type='submit'
      className='green me fsmall ph3 dim pointer bg-white'
      value='Submit' />
  </form>
    )

export default NewChatMessage

// <PaperClip className='ph3 dim' />
// do not delete above component, super useful when download functionality implemented (josh)
