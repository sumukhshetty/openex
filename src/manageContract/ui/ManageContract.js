import React, { Component } from 'react'

import AddEtherModal from './../layouts/AddEtherModal'
import WithdrawEtherModal from './../layouts/WithdrawEtherModal'


class ManageContract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddEherModal: false,
      showWithdrawEherModal: false,
      AddAmount: 0,
      WithdrawAmount: 0,
      sendEtherState: this.props.sendEtherState
    }
  }

  showAddEherModal(e) {
    e.preventDefault()
    this.setState({ showAddEherModal: true })
  }

  showWithdrawEherModal(e) {
    e.preventDefault()
    this.setState({ showWithdrawEherModal: true })
  }

  removeAddEtherModal(e) {
    if (
      this.props.sendEtherState !== 'sending' &&
      e.target.classList.contains('bg-black-80')
    ) {
      this.setState({ showAddEherModal: false })
      this.props.resetEtherState()
    }
  }

  removeWithdrawEtherModal(e) {
    if (
      this.props.sendEtherState !== 'sending' &&
      e.target.classList.contains('bg-black-80')
    ) {
      this.setState({ showWithdrawEherModal: false })
      this.props.resetEtherState()
    }
  }

  handleAddEtherRequest(e) {
    e.preventDefault()
    this.props.addEther(this.state.AddAmount, this.props.sellerInterface.data.address, this.props.web3.data, this.props.sellerInterface.data)
  }

  handleWithdrawEtherRequest(e) {
    e.preventDefault()
    this.props.withdrawEther(this.state.WithdrawAmount, this.props.sellerInterface.data.address, this.props.web3.data, this.props.sellerInterface.data)
  }


  onAddEtherAmountChange(e) {
    this.setState({ AddAmount: e.target.value })
  }

  onWithdrawAmountChange(e) {
    this.setState({ WithdrawAmount: e.target.value })
  }

  componentDidMount(){
    this.props.getAvailableBalance(this.props.sellerInterface.data.address, this.props.orderDB.data, this.props.web3.data)
    this.props.getContractBalance(this.props.sellerInterface.data.address, this.props.web3.data)
  }

  render() {
    console.log('ui.managecontract.render');
    console.log(this.props);
    var component = this
    if (this.props.sellerInterface.data==='obtaining...' || this.props.orderDB.data==='obtaining...'){
      return (
        <div>loading</div>
        )
    } else {
      // switch to mainnet
      var url = 'https://kovan.etherscan.io/address/' + this.props.sellerInterface.data.address

      return (
        <div className="w-100 bg-smoke h-100">
          <div className="w-75 center pv3">
            <h1>You can manage your smart contract on this page</h1>
            <form className="mv3">
              <fieldset>
                <legend className="b f4 mv3">Your contract Information</legend>
                <div className="bg-white pa3">
                  <Row
                    field="Available Balance"
                    value={`${this.props.managecontract.availableBalance} ETH`}

                    button1={<button className="grow mr3" onClick={this.showAddEherModal.bind(this)}>+ Add Ether</button>}
                    button2={<button className="grow mr3" onClick={this.showWithdrawEherModal.bind(this)}>Withdraw</button>}
                  />
                  {this.state.showAddEherModal &&
                  <AddEtherModal
                    sendEtherState={this.props.sendEtherState}
                    close={this.removeAddEtherModal.bind(this)}
                    handleEscrowRequest={this.handleAddEtherRequest.bind(this)}
                    onEtherAmountChange={this.onAddEtherAmountChange.bind(this)}
                  />}
                  {this.state.showWithdrawEherModal &&
                  <WithdrawEtherModal
                    sendEtherState={this.props.sendEtherState}
                    close={this.removeWithdrawEtherModal.bind(this)}
                    handleEscrowRequest={this.handleWithdrawEtherRequest.bind(this)}
                    onEtherAmountChange={this.onWithdrawAmountChange.bind(this)}
                  />}
                  {/*<Row
                    field="In Escrow"
                    value={`${this.props.managecontract.contractBalance - this.props.managecontract.availableBalance} ETH`}
                    button2={
                      <button className="w5 grow mr3">Active Trades</button>
                    }
                  />*/}
                  <Row
                    field="In Escrow"
                    value={`${this.props.managecontract.contractBalance - this.props.managecontract.availableBalance} ETH`}
                  />
                  <a href={url} target="_blank">View on the Etherscan</a>
                  <Row field="Trade Limit" value={`${5} ETH`} />
                  <Row field="Status" value="Live" />
                  {/*<div className="flex mxe">
                    <div className="flex mxc mv3 w-50 ">
                      <input
                        type="submit"
                        className="mv3 bg-danger grow"
                        value="Destroy Contract"
                      />
                    </div>
                  </div>*/}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      )

    }

  }
}

const Row = ({ field, value, button1, button2 }) =>
  <div className="flex pa0 mv3 w-100 cxc">
    <p className="w-25">
      {field}
    </p>
    <p className="w-25">
      {value}
    </p>
    <div className="w-50 flex mxa">
      {button1}
      {button2}
    </div>
  </div>

/*const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user
  }
}*/

//const ManageContract = connect(mapStateToProps)(ContractManagementPage)

export default ManageContract
