import React, {Component} from 'react';


export default class NotLiveCountry extends Component {
  logout(e){
    this.props.onLogoutUserClick(e)
  }

  render() {
    console.log('NotLiveCountry.render')
    console.log(this.props)
    return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>Sorry We currently aren't live in your country</p>
        <p className='measure f5'>For help email support@automte.com</p>
        <a onClick={this.logout.bind(this)}>Logout</a>
      </div>
    </div>
  )  
  }
}