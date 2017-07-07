import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ManageContract extends Component {
  constructor(props){
    super(props)
    this.state ={
      availableBalance: 0
    }
  }

  componentWillMount() {
    console.log("ManageContract.componentWillMount")
    var availableBalance
    console.log(this.props.ethorderbook.data)
    this.props.loadContractData(this.props.ethorderbook.data)
    /*this.props.ethorderbook.data.availableBalance(function(error, result){
      if(!error){
        console.log(result)
        this.setState({availableBalance:result})
      }
    })*/
  }
  componentDidMount(){
    console.log("ManageContract.componentDidMount")
    console.log(this.props.ethorderbook.data)
  }

  render() {
    console.log("ManageContract.render")
    console.log(this.props)
    var component = this
    if (this.props.ethorderbook.data==='obtaining...'){
      return (
        <div>loading</div>
        )
    } else {
      // switch to mainnet
      var url = 'https://kovan.etherscan.io/address/' + this.props.ethorderbook.data.address
      var availableBalance
      this.props.ethorderbook.data.availableBalance(function(error, result){
        if(!error){
          console.log("we got an availableBalance")
          console.log(result)
          availableBalance = component.props.web3.data.fromWei(result, 'ether')
          console.log(availableBalance.toNumber())
        }
      })
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
                    value={`${availableBalance} ETH`}
                    button1={<button className="grow mr3">+ Add Ether</button>}
                    button2={<button className="grow mr3">Withdraw</button>}
                  />
                  <Row
                    field="In Escrow"
                    value={`${2} ETH`}
                    button2={
                      <button className="w5 grow mr3">Active Trades</button>
                    }
                  />

                  <a href={url} target="_blank">View on the BlockChain</a>
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
