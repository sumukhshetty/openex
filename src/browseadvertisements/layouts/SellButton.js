import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {notify} from 'react-notify-toast'

class SellButton extends Component {
  render () {
    return (
      <td className='fb5'>
        <button onClick={()=>notify.show("Please signup or login to sell ether")}> Sell </button>
      </td>
    );
  }
}

export default SellButton;
