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
      <circle cx="8" cy="21" r="2" />
      <circle cx="20" cy="21" r="2" />
      <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
    </svg>
  );
};
