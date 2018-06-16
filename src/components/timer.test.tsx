import * as enzyme from 'enzyme'
import * as React from 'react'

import Timer from './timer'

it('renders', ()=> {
  const timer = enzyme.shallow(<Timer updateFreq={100} targetTime="2018-23-32">{({timeLeft})=> <div/>}</Timer>)
  expect(timer).toMatchSnapshot()
})