import React from 'react'
import Shapes from '../../images/WhyUseOurPlatform/shapes.png'
import Lock from '../../images/WhyUseOurPlatform/lock.png'
import Dots from '../../images/WhyUseOurPlatform/dots.png'
import Globe from '../../images/WhyUseOurPlatform/earth.png'
import Crown from '../../images/WhyUseOurPlatform/crown.png'
import Heart from '../../images/WhyUseOurPlatform/heart.png'


const Feature = (props) => <div className='flex cxc w5 mv2'>
  <div className='mw2 flex mxc'>

    <img src={props.src} alt={props.title}/>
  </div>
  <div className='w-100 pl4'>
    <p className='ttu'>{props.title}</p>
    <p>{props.text}</p>
  </div>
</div>

const WhyUseOurPlatform = () =>
  <div className='w-100 center pv3'>
    <h2 className='tc w-100 pv4'>Why Use Our Platform</h2>

    <div className='flex mxb wrap w-75 center'>

      <Feature
        src={Crown}
        title={'SOVEREIGN'}
        text={'You retain ownership of your ether independent of the service, letting you use them elsewhere.'}
      />
      <Feature
        src={Lock}
        title={'SECURE'}
        text={'Transact directly on the Ethereum blockchain, preventing any single point-of-failure.'} />
      <Feature
        src={Shapes}
        title={'Future proof'}
        text={`We prepare for the DApp
          ecosystem by introducing you
        to using decentralised wallets.`} />
      <Feature
        src={Dots}
        title={'Agile'}
        text={'Direct trading between users ensures that prices respond to market forces.'} />
      <Feature
        src={Globe}
        title={'Global'}
        text={'Our system can be used in any country, including developing and emerging markets.'} />
      <Feature
        src={Heart}
        title={'Easy to use'}
        text={'We’ve designed the product your needs in mind, and will guide you every step of the way.'} />
    </div>
  </div>

export default WhyUseOurPlatform
