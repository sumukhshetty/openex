import React from 'react'
import PropTypes from 'prop-types'

const Star = (props) => {
  return (
    <svg
      width={props.size + `px`}
      height={props.size + `px`}
      viewBox='0 0 16 16'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}>
      <desc>
        yellow Star
      </desc>
      <defs>
        <polygon id='path-1' points='379 116.057632 383.944 119 382.636 113.450789 387 109.718947 381.2472 109.231842 379 104 376.7528 109.231842 371 109.718947 375.364 113.450789 374.056 119'
        />
      </defs>
      <g
        id='Mockups'
        stroke='none'
        stroke-width='1'
        fill='none'
        fill-rule='evenodd'>
        <g id='Buy-trade-order-page' transform='translate(-412.000000, -429.000000)'>
          <g id='Group-2' transform='translate(41.000000, 325.000000)'>
            <mask id='mask-2' fill='white'>
              <use xlinkHref='#path-1' />
            </mask>
            <use
              id='star1'
              stroke='gold'
              stroke-width='0.5'
              fill={props.colour}
              xlinkHref='#path-1' />
          </g>
        </g>
      </g>
    </svg>
  )
}

Star.propTypes = {
  size: PropTypes.number.isRequired,
  colour: PropTypes.string.isRequired
}

Star.defaultProps = {
  size: 16,
  colour: '#F8E81C'
}

export default Star
