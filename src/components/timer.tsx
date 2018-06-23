import * as moment from 'moment'
import * as React from 'react'


export interface IProps {
  targetTime: moment.MomentInput
  updateFreq: number
  children({timeLeft}: {timeLeft: moment.Duration}) : JSX.Element
}

export interface IState {
  timeLeft: moment.Duration
}

class Timer extends React.Component<IProps, IState> {

  public static calcDuration(targetTime: moment.MomentInput) :moment.Duration{
    return moment.duration(moment(targetTime).diff(moment.now()))
  }

  private intervalId: number
  constructor(props: any) {
    super(props)
    this.state = {timeLeft : Timer.calcDuration(props.targetTime)}
    this.updateTimer = this.updateTimer.bind(this)
  }


  public componentDidMount() {
    this.intervalId = window.setInterval(this.updateTimer, this.props.updateFreq)
  }

  public componentWillUnmount() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId)
    }
  }

  public updateTimer() {
    const {targetTime} = this.props
    const duration = Timer.calcDuration(targetTime)
    this.setState({timeLeft: duration})
  }



  public render() {
    const {children} = this.props
    const {timeLeft} = this.state

    return children({timeLeft})
  }

}

export default Timer