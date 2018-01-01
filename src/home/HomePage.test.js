import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import HomePage from './HomePage'

Enzyme.configure({ adapter: new Adapter() })

describe('Home Page', () => {
  it('Should mount', () => {
    const homePage = shallow(<HomePage />)
  })
})

