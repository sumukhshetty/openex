import React from 'react';

export default (props) => {
  return (

    <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' className={props.className} onClick={props.action}>

      <desc>Conversion Symbol</desc>
      <defs>
        <circle id='path-1' cx='24' cy='24' r='24' />
        <filter x='-20.8%' y='-16.7%' width='141.7%' height='141.7%' filterUnits='objectBoundingBox' id='filter-2'>
          <feOffset dx='0' dy='2' in='SourceAlpha' result='shadowOffsetOuter1' />
          <feGaussianBlur stdDeviation='3' in='shadowOffsetOuter1' result='shadowBlurOuter1' />
          <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.140766531 0' type='matrix' in='shadowBlurOuter1' />
        </filter>
      </defs>
      <g id='Mockups' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='-' transform='translate(-243.000000, -98.000000)'>
          <g id='convert' transform='translate(249.000000, 102.000000)'>
            <g id='Oval'>
              <use fill='black' fillOpacity='1' filter='url(#filter-2)' xlinkHref='#path-1' />
              <use fill='#FFFFFF' fillRule='evenodd' xlinkHref='#path-1' />
            </g>
            <g id='Page-1' transform='translate(13.000000, 15.000000)' fill='#37BCFF'>
              <polygon id='Fill-1' points='4.99949995 0 3.57135714 1.428 0 4.999 1.42814281 6.429 3.99939994 3.857 3.99939994 18 6.00060006 18 6.00060006 3.857 8.57185719 6.429 10 4.999 6.42864286 1.428' />
              <polygon id='Fill-2' points='16.001 0 16.001 14.143 13.43 11.571 12 13.001 15.573 16.572 17.001 18 18.429 16.572 22 13.001 20.572 11.571 18.001 14.143 18.001 0' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
