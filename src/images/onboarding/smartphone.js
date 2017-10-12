import React from 'react';

export default ({ complete }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={complete ? '#494949' : '#008be9'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-auto h2"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
};
