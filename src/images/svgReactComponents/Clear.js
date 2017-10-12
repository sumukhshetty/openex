import React from 'react'

const Clear = ({ action }) => {
  return (
    <svg
      width='13px'
      height='12px'
      viewBox='0 0 23 22'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className='pointer dim'
      onClick={action}
    >
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='2'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <g
          id='check-circle'
          transform='translate(1.000000, 0.000000)'
          stroke='#000000'
          strokeWidth='2'
        >
          <path
            d='M20,10.07 L20,11 C19.9974678,15.4286859 17.082294,19.328213 12.8353524,20.583901 C8.58841086,21.839589 4.02139355,20.1523121 1.61095509,16.4370663 C-0.799483376,12.7218205 -0.479136554,7.86363898 2.39827419,4.49707214 C5.27568494,1.13050531 10.0247126,0.0575252842 14.07,1.86'
            id='Shape'
          />
          <polyline id='Shape' points='21 2 10 13 7 10' />
        </g>
      </g>
    </svg>
  )
}

export default Clear
