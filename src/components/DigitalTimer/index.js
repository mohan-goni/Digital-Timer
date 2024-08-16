import {Component} from 'react'
import './index.css'

const playImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

const initialState = {
  toggleImg: playImg,
  toggleText: 'Start',
  toggleRunPause: 'Paused',
  timeInSeconds: 25 * 60,
  setTime: 25,
  isRunning: false,
}
class DigitalTimer extends Component {
  state = initialState

  onReset = () => {
    clearInterval(this.timerId)
    this.setState(initialState)
  }

  onToggleStartPause = () => {
    const {isRunning} = this.state

    if (isRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({
          timeInSeconds: prevState.timeInSeconds - 1,
        }))
      }, 1000)
    }
    this.setState(prevState => ({
      toggleImg: prevState.toggleImg === playImg ? pauseImg : playImg,
      toggleText: prevState.toggleText === 'Start' ? 'Pause' : 'Start',
      toggleRunPause:
        prevState.toggleRunPause === 'Paused' ? 'Running' : 'Paused',
      isRunning: !prevState.isRunning,
    }))
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      setTime: prevState.setTime + 1,
      timeInSeconds: (prevState.setTime + 1) * 60,
    }))
  }

  onClickMinus = () => {
    this.setState(prevState => ({
      setTime: prevState.setTime - 1,
      timeInSeconds: (prevState.setTime - 1) * 60,
    }))
  }

  formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    if (minutes >= 0) {
      const seconds = timeInSeconds % 60
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
      return `${formattedMinutes}:${formattedSeconds}`
    }
    if (minutes < 0) {
      return '00:00'
    }

    return clearInterval(this.timerId)
  }

  render() {
    const {
      toggleImg,
      toggleText,
      toggleRunPause,
      setTime,
      timeInSeconds,
    } = this.state
    const disableMinus = setTime <= 0

    const formattedTime = this.formatTime(timeInSeconds)

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div>
          <div className="img-options-sections">
            <div className="image">
              <div className="time-text-container">
                <p className="time">{formattedTime}</p>
                <p className="running-paused-text">{toggleRunPause}</p>
              </div>
            </div>
            <div>
              <div className="options-container">
                <div className="options">
                  <button
                    onClick={this.onToggleStartPause}
                    type="button"
                    className="button"
                  >
                    <img
                      src={toggleImg}
                      alt="play icon"
                      className="icon"
                      id="start-pause-icon"
                    />
                  </button>

                  <p className="icon-label" htmlFor="start-pause-icon">
                    {toggleText}
                  </p>
                </div>
                <div className="options">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onReset}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                      alt="reset icon"
                      className="icon"
                      id="reset-pause-icon"
                      onClick={this.onReset}
                    />
                  </button>
                  <p className="icon-label" htmlFor="reset-pause-icon">
                    Reset
                  </p>
                </div>
              </div>
              <p className="timer-limit-text">Set Timer limit</p>
              <div className="set-time-container">
                <button
                  type="button"
                  className="plus-minus"
                  disabled={disableMinus}
                  onClick={this.onClickMinus}
                >
                  -
                </button>
                <div className="time-limit-container">
                  <p className="set-time">{setTime}</p>
                </div>
                <button
                  type="button"
                  className="plus-minus"
                  onClick={this.onClickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
