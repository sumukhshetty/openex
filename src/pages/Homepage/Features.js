import React from 'react'
import { FormattedMessage } from 'react-intl'

import FactorDailyLogo from '../../images/featured/FactorDaily.png'
import Dapps from '../../images/featured/dapps.png'
import techET from '../../images/featured/Tech_Economic_Times_Logo.jpg'

const Features = () => (
  <section
    className="flex wrap mxa pa3 cxc"
    style={{ backgroundColor: '#fafafa' }}
  >
    <p className="w-25-l tc">
      <FormattedMessage id="home.asFeaturedOn" />
    </p>
    <a
      href="https://factordaily.com/altcoin-cryptocurrency-exchanges-in-india/"
      target="_blank"
      className="w-25-l tc"
    >
      <img src={FactorDailyLogo} height="75px" alt="Factor Daily Logo" />
    </a>
    <a
      href="https://dapps.ethercasts.com/dapp/ezether"
      target="_blank"
      className="w-25-l tc"
    >
      <img src={Dapps} alt="Dapps Universe Logo" className="mw-100 h-auto " />
    </a>
    <a
      href="http://tech.economictimes.indiatimes.com/news/technology/cryptocurrencies-catches-the-fancy-of-bengalurus-tech-driven-millennials/60726399"
      target="_blank"
      className="w-25-l tc"
    >
      <img
        src={techET}
        alt="Economic Times, Times of India"
        height="75px"
        className="mw-100"
      />
    </a>
  </section>
)

export default Features
