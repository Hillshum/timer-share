import * as enzyme from 'enzyme'
import * as lolex from 'lolex'
import * as moment from 'moment'
import * as React from 'react'


import Timer from './timer'

describe('Timer', ()=> {
   let clock : lolex.Clock;
   beforeAll(()=> {
      clock = lolex.install()
   })

   afterAll(()=> {
      clock.uninstall()
   })
  it('renders', ()=> {
      const timer = enzyme.shallow(<Timer updateFreq={100} targetTime="2018-23-32">{({timeLeft})=> <div/>}</Timer>)
      expect(timer).toMatchSnapshot()
  })


  it('correctly calculates a new duration', ()=> {
    const target = moment(5000)
    // TODO : wrap now()

    const result = Timer.calcDuration(target)
    const expectedResult = moment.duration(5000)
    expect(result.asMilliseconds()).toBe(expectedResult.asMilliseconds())

  })


})