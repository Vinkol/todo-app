import React, { useEffect } from 'react'
import './Timer.css'

export default function Timer({ id, min, sec, isRunning, updateTimer, toggleTimer }) {
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (sec > 0) {
          updateTimer(id, min, sec - 1, true)
        } else if (min > 0) {
          updateTimer(id, min - 1, 59, true)
        } else {
          updateTimer(id, 0, 0, false)
          clearInterval(interval)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [min, sec, isRunning, updateTimer, id])

  return (
    <React.Fragment>
      <button onClick={() => toggleTimer(id, true)} className="icon-play" type="button" aria-label="Play button" />
      <button onClick={() => toggleTimer(id, false)} className="icon-pause" type="button" aria-label="Pause button" />
      <span className="time">
        {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
      </span>
    </React.Fragment>
  )
}
