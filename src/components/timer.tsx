import * as moment from 'moment'
import * as React from 'react'


export interface IProps {
  targetTime: moment.MomentInput
  updateFreq: number
  children({timeLeft}: {timeLeft?: moment.Duration}) : JSX.Element
}

interface IState {
  timeLeft?: moment.Duration
}

class Timer extends React.Component<IProps, IState> {
  private timeoutId: number
  constructor(props: any) {
    super(props)
    this.state = {timeLeft : this.calcDuration(props.targetTime)}
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
    const duration = this.calcDuration(targetTime)
    this.setState({timeLeft: duration})
  }

  public calcDuration(targetTime: moment.MomentInput) :moment.Duration{
    return moment.duration(moment(targetTime).diff(moment.now()))
  }


  public render() {
    const {children} = this.props
    const {timeLeft} = this.state

    return children(timeLeft? {timeLeft} : {})
  }

}

export default Timer