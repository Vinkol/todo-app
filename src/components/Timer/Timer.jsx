import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ data, update }) => {
  // Проверяем, что data существует и имеет поля min и sec
  const { min = 0, sec = 0, id } = data || {} // Если data не передано, присваиваем значения по умолчанию

  const [timeMin, setMin] = useState(min)
  const [timeSec, setSec] = useState(sec)
  const [active, setActive] = useState(false)
  const [zero, setZero] = useState(timeMin === 0 && timeSec === 0)
  const intervalRef = useRef(null)

  const updateTimer = () => {
    if (zero) {
      setSec((prevSec) => {
        const newSec = prevSec + 1
        if (newSec === 60) {
          setMin((prevMin) => prevMin + 1)
          return 0
        }
        return newSec
      })
    } else {
      setSec((prevSec) => {
        const newSec = prevSec - 1
        if (newSec === -1) {
          setMin((prevMin) => prevMin - 1)
          return 59
        }
        return newSec
      })
    }

    // Обновляем родительский компонент через update
    if (update) {
      update(id, { min: timeMin, sec: timeSec })
    }

    if (timeMin === 0 && timeSec === 0) {
      clearInterval(intervalRef.current)
    }
  }

  const startTimer = () => {
    setActive(true)
    intervalRef.current = setInterval(updateTimer, 1000)
  }

  const stopTimer = () => {
    setActive(false)
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current) // Очищаем интервал при размонтировании компонента
  }, [])

  useEffect(() => {
    if (timeMin === 0 && timeSec === 0) {
      setZero(true)
    }
  }, [timeMin, timeSec])

  return (
    <span className="description">
      <button type="button" className="icon-play" onClick={startTimer} disabled={active} />
      <button type="button" className="icon-pause" onClick={stopTimer} />
      <span className="timer">{`${timeMin}:${timeSec < 10 ? `0${timeSec}` : timeSec}`}</span>
    </span>
  )
}

Timer.defaultProps = {
  data: { min: 0, sec: 0, id: 0 }, // Дефолтные значения для данных
  update: () => {}, // Функция по умолчанию, если update не передан
}

Timer.propTypes = {
  data: PropTypes.shape({
    min: PropTypes.number,
    sec: PropTypes.number,
    id: PropTypes.number.isRequired, // id обязательное
  }).isRequired,
  update: PropTypes.func.isRequired, // update — обязательная функция
}

export default Timer
