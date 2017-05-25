import React from 'react'
import Community from '../../images/svgReactComponents/Community'
import Lock from '../../images/svgReactComponents/Lock'
import Clock from '../../images/svgReactComponents/Clock'
import Globe from '../../images/svgReactComponents/Globe'
import Dollar from '../../images/svgReactComponents/Dollar'
import Heart from '../../images/svgReactComponents/Heart'

const Feature = (props) => <div className='flex cxc w5 mv2'>
  <div className='mw2 flex mxc'>
    {props.childComponent}
  </div>
  <div className='w-100 ml3'>
    <p>{props.title}</p>
    <p className='ftiny'>{props.text}</p>
  </div>
</div>

const Features = ({props}) => (
  <div className='w-100'>
    <h2 className='tc w-100 pv3'>Why Use our Platform</h2>

    <div className='flex mxb wrap'>

      <Feature
        childComponent={<Community />}
        title={'Community'}
        text={'We involve the community in building and growing the product.'}
      />
      <Feature
        childComponent={<Lock />}
        title={'Secure'}
        text={'At no point do we  have access to any funds. This makes your funds hacker proof.'} />
      <Feature
        childComponent={<Clock />}
        title={'Quick'}
        text={'Instead of taking days in a centralized exchange, this would take a couple of hours at max.'} />
      <Feature
        childComponent={<Globe />}
        title={'Global'}
        text={'Our product can be used by people who want to buy ether in developing and emerging markets.'} />
      <Feature
        childComponent={<Dollar />}
        title={'Cheap'}
        text={'Our product can be used by people who want to buy ether in developing and emerging markets.'} />
      <Feature
        childComponent={<Heart />}
        title={'UX'}
        text={'It was built from scratch on  the web 3 stack keeping the user and his experience in mind.'} />
    </div>
  </div>

  )

Features.defaultProps = {}

export default Features
