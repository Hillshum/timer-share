import * as moment from 'moment'
import * as React from 'react'


export interface IProps {
  targetTime: moment.MomentInput
  updateFreq: number
  children({timeLeft}: {timeLeft: moment.Duration}) : JSX.Element
}

interface IState {
  timeLeft?: moment.Duration
}

class Timer extends React.Component<IProps, IState> {

  public static calcDuration(targetTime: moment.MomentInput) :moment.Duration{
    return moment.duration(moment(targetTime).diff(moment.now()))
  }

  private timeoutId: number
  constructor(props: any) {
    super(props)
    this.state = {timeLeft : Timer.calcDuration(props.targetTime)}
  }


  public componentDidMount() {
    this.timeoutId = window.setInterval(this.updateTimer, this.props.updateFreq)
  }

  public componentWillUnmount() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId)
    }
  }

  public updateTimer = () => {
    const {targetTime} = this.props
    const duration = Timer.calcDuration(targetTime)
    this.setState({timeLeft: duration})
  }



  public render() {
    const {children} = this.props
    const {timeLeft} = this.state

    return timeLeft ? children({timeLeft}) : null
  }

}

export default Timer