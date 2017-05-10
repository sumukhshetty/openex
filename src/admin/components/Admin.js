import React, { Component } from 'react'
import ActiveEscrowList from './../../activeescrowlist/layouts/ActiveEscrowList'

export default class Admin extends Component {

  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center pv3'>
          <div>
            <div>
              <p className='b pv3 measure-wide'>ADMIN</p>
              <ActiveEscrowList />

            </div>
          </div>
        </div>
      </section>
    )
  }
}
