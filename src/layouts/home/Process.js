import React from 'react'
import PropTypes from 'prop-types'
import Cart from '../../images/svgReactComponents/cart'
import Shop from '../../images/svgReactComponents/shop'
import Ether from '../../images/svgReactComponents/ether'

const Step = ({image, byline}) =>
  <div className='flex col mxa cxc w5 h5 bg-white shadow-1 ma3'>
    <div className='w3 flex mxc'>
      {image}
    </div>
    <div className='w-100 tc'>
      <p>{byline}</p>
    </div>
  </div>

const Process = ({props}) => (
  <div className='w-100 bg-blue pa3 flex col'>
    <h2 className='tc w-100  white'>How It Works</h2>
    <div className='flex mxc wrap'>
      <Step image={<Shop />} byline={'Sign Up!'} />
      <Step image={<Cart />} byline={'Find Trade'} />
      <Step image={<Ether />} byline={'Buy/Sell Ether'} />
    </div>
    <div className='flex mxc wrap' />
  </div>)

Process.propTypes = {}
Process.defaultProps = {}

export default Process
