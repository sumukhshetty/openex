import React, { Component } from 'react'
import Region from './Region'
import Copywrite from './Copywrite'
import FooterTable from './FooterTable'

class Footer extends Component {
  render() {
    return(
      <div>
      Footer
      <Region/>
      <Copywrite/>
      <FooterTable/>
      </div>
    )
  }
}

export default Footer
