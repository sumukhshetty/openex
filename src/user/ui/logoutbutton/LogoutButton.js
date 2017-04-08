import React from 'react';

const LogoutButton = ({ onLogoutUserClick }) => {
  return (
    <p className='tracked mh4 pointer dim' onClick={(event) => onLogoutUserClick(event)}>Logout</p>
  );
};

export default LogoutButton;
