import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {notify} from 'react-notify-toast'

class BuyButton extends Component {
  render () {
    return (
      <td className='fb5'>
        <button onClick={()=>notify.show("Please signup or login to buy ether")}> Buy </button>
      </td>
    );
  }
}

export default BuyButton;
