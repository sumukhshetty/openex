import React from 'react'
import { mountWithIntl, shallowWithIntl } from '../../util/i18n-enzyme'
import toJson from 'enzyme-to-json'
import Testimonials from '../Homepage'

let wrapper = null

describe('testimonials', () => {
  it('renders expected markup', () => {
    wrapper = mountWithIntl(<Testimonials />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
