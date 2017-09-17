import React, { Component } from 'react'
import Copyright from './Copyright'
import FooterTable from './FooterTable'

class Footer extends Component {
  render() {
    return (
      <footer className="bg-blue pv4">
        <div className="w-75 center">
          <div className="flex mxe">
            <FooterTable />
          </div>
          <Copyright />
        </div>
      </footer>
    )
  }
}

export default Footer
