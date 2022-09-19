import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  const tryAgain = () => {
    onClickRetry()
  }

  return (
    <div className="failed-view-container">
      <img
        src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662697146/FailureIcon_mos7ed.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failed-text">Something went wrong. Please try again</p>
      <button type="button" className="retry-button" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
