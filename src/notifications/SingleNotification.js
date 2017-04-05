import React from 'react';
import ChatIcon from '../images/svgReactComponents/Chat';
import CompleteIcon from '../images/svgReactComponents/Complete';
import JoinedIcon from '../images/svgReactComponents/Joined';

export const SingleNotification = (props) => {
  let icon;
  switch (props.type) {
    case 'chat':
      icon = <ChatIcon />;
      break;
    case 'complete':
      icon = <CompleteIcon />;
      break;
    case 'joined':
      icon = <JoinedIcon />;
      break;
    default:
      return null;
  }

  return (
    <div className='bg-white pa2 mv3 flex col'>
      <div className='flex cxc mxb'>
        {icon}
        <p className='b ma0 pa0'>{props.name}</p>
        <small>{props.time}</small>
      </div>
      {props.message && <p>{props.message}</p>}
    </div>
  );
};
