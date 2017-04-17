import React, { Component } from 'react';
import AddEscrowModal from './AddEscrowModal';

export default class AccountEther extends Component {

  constructor (props) {
    super(props);
    this.state = {
      balance: 5,
      escrow: 2,
      showEscrowModal: false
    };
    this.removeEscrowModal = this.removeEscrowModal.bind(this);
    this.showEscrowModal = this.showEscrowModal.bind(this);
    this.handleEscrowRequest = this.handleEscrowRequest.bind(this);
  }

  removeEscrowModal (e) {
    if (e.target.classList.contains('bg-black-80')) {
      this.setState({showEscrowModal: false});
    }
  }
  showEscrowModal () {
    this.setState({showEscrowModal: true});
  }

  handleEscrowRequest (e) {
    e.preventDefault();
    console.log('trade request handled');
    this.setState({showEscrowModal: false});
  }

  render () {
    return (
      <div className='pt3'>
        {this.state.showEscrowModal && <AddEscrowModal close={this.removeEscrowModal} handleEscrowRequest={this.handleEscrowRequest} />}
        <p className='b'>Your Account</p>
        <table>
          <tbody>
            <tr className='flex cxc'>
              <td className='flex cxc fb25'>Available Balance:<span className='green f4 pl1'>{this.state.balance} Eth</span></td>
              <td className=' flex cxc fb25'>In Escrow:<span className='danger f4 pl1'>{this.state.escrow} Eth</span></td>
              <button className='me grow' onClick={this.showEscrowModal}>+ Add Ether</button>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
