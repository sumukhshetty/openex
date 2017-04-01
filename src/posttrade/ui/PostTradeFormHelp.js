import React, { Component } from 'react';

class PostTradeHelp extends Component {
  render () {
    return (
      <main className='w-50 mv3'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <p>
              What kind of trade advertisement do you wish to create? If you wish to sell ether make sure you have ether in your Metamask wallet.
            </p>
            <p>
              For online trades you need to specify your country.
            </p>
            <p>
              Margin you want over the ether market price. Use a negative value for buying or selling under the market price to attract more contracts. For more complex pricing edit the price equation directly.
            </p>
            <p>
              How the trade price is determined from the hourly market price. For more information about equations how to determine your traing price see pricing FAQ.
              <bold>
                Please note that the advertiser is always responsible for all payment processing fees.
              </bold>
            </p>
            <p>
              Optional. Minimum transaction limit in one trade.
            </p>
            <p>
              Optional. Restrict trading amounts to specific comma-separated integers, for example 200,500,1000. In fiat currency (INR/EUR/etc). Handy for coupons, gift cards, etc.
            </p>
            <p>
              Other information you wish to tell about your trade. Example 1: This advertisement is only for cash trades. If you want to pay online, contact automte.com/ad/1234.
              Example 2: Please make request only when you can complete the payment with cash within 12 hours.
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default PostTradeHelp;
