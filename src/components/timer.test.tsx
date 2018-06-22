import * as enzyme from 'enzyme'
import * as moment from 'moment'
import * as React from 'react'


import Timer from './timer'

describe('Timer', ()=> {
  it('renders', ()=> {
    const timer = enzyme.shallow(<Timer updateFreq={100} targetTime="2018-23-32">{({timeLeft})=> <div/>}</Timer>)
    expect(timer).toMatchSnapshot()
  })

  it('correctly calculates a new duration', ()=> {
    const target = moment("2020-12-30")
    // TODO : wrap now()

    const result = Timer.calcDuration(target)
    expect(result).toBeFalsy()

  })


})