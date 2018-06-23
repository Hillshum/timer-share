import * as enzyme from 'enzyme'
import * as lolex from 'lolex'
import * as moment from 'moment'
import * as React from 'react'


import Timer, {IProps, IState} from './timer'

describe('Timer', ()=> {
    let clock : lolex.Clock;
    let wrapper: enzyme.ShallowWrapper<IProps, IState, Timer> 

    beforeAll(()=> {
      clock = lolex.install()
   })

   afterAll(()=> {
      clock.uninstall()
   })

  //  beforeEach(()=> {
  //  })

   afterEach(()=> {
      wrapper.unmount()
   })
  it('renders', ()=> {
    wrapper = enzyme.shallow(<Timer updateFreq={100} targetTime="2018-23-32">{({timeLeft})=> <div/>}</Timer>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })


  it('correctly calculates a new duration', ()=> {
    const deltas = [12435, 34325, 3421, 2 ]

    deltas.forEach(d=> {

      const result = Timer.calcDuration(d)
      const expectedResult = moment.duration(d)
      expect(result.asMilliseconds()).toBe(expectedResult.asMilliseconds())

    })
  })

  describe('the interval callback', ()=>{
    it('gets registered properly', ()=> {
      const updateFreq = 20
      const updateSpy = jest.spyOn(Timer.prototype, 'updateTimer')
      wrapper = enzyme.shallow(<Timer updateFreq={updateFreq} targetTime={moment().add(3, 'years')}>{jest.fn()}</Timer>)
      clock.tick(21)
      expect(updateSpy).toHaveBeenCalledTimes(1)
      clock.tick(21)
      expect(updateSpy).toHaveBeenCalledTimes(2)
    })

    it('updates state properly', ()=> {

      const updateFreq = 20

      wrapper = enzyme.shallow(<Timer updateFreq={updateFreq} targetTime={moment().add(3, 'seconds')}>{jest.fn()}</Timer>,
        {disableLifecycleMethods: true},
      )
      const instance = wrapper.instance()
      clock.tick(10)
      instance.updateTimer()
      expect(wrapper.state('timeLeft').asMilliseconds()).toBe(2990)
    })
    
    it('gets removed properly', ()=> {
      const updateFreq = 20
      const updateSpy = jest.spyOn(Timer.prototype, 'updateTimer')
      wrapper = enzyme.shallow(<Timer updateFreq={updateFreq} targetTime={moment().add(3, 'years')}>{jest.fn()}</Timer>)
      clock.tick(200)
      wrapper.unmount()
      updateSpy.mockClear()

      clock.tick(350)

      expect(updateSpy).toHaveBeenCalledTimes(0)
      updateSpy.mockRestore()
    })


  })

  it('calls the child function when state updates', ()=> {
    const durations = [3435, 343, 534634, 3534643564536]

    const updateFreq = 345
    const targetTime = 200
    const child = jest.fn()
    wrapper = enzyme.shallow(<Timer updateFreq={updateFreq} targetTime={targetTime}>{child}</Timer>)
    durations.forEach(ms=> {

      const d = moment.duration(ms)
      wrapper.setState({timeLeft: d})
      wrapper.update()
      expect(child).lastCalledWith({timeLeft: d})
    })
    expect(child).toHaveBeenCalledTimes(durations.length + 1) // called once initially
  })

  it('schedules a callback and updates', ()=> {
    const updateFreq = 345
    const targetTime = 200
    const child = jest.fn()
    enzyme.shallow(<Timer updateFreq={updateFreq} targetTime={targetTime}>{child}</Timer>)
    expect(child).toHaveBeenCalledTimes(1)
    

    clock.tick(updateFreq - 1)

    expect(child).toHaveBeenCalledTimes(1)

    clock.tick(updateFreq)

    expect(child).toHaveBeenCalledTimes(2)
    clock.tick(updateFreq)
    expect(child).toHaveBeenCalledTimes(3)

  })

})