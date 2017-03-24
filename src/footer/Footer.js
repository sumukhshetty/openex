import React, { Component } from 'react'
import Region from './Region'
import Copyright from './Copyright'
import FooterTable from './FooterTable'

class Footer extends Component {
  render() {
    return(
      <footer className="page-footer">
        <Region/>
        <FooterTable/>
        <Copyright/>
      </footer>
    )
  }
}

export default Footer
