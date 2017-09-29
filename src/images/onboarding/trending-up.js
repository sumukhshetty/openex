import React from 'react';

export default ({ complete }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={complete ? '#008be9' : '#494949'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-auto h2"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
};
