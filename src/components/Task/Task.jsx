import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

import Timer from '../Timer/Timer'

const Task = ({ todo, CompletedCurrentTask, DeleteCurrentTask, EditCurrentTask, updateTimer, toggleTimer }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.label)
  const [timeAgo, setTimeAgo] = useState('')

  const { checked, id, createdDate } = todo

  useEffect(() => {
    if (checked) {
      updateTimer(id, 0, 0)
    }
  }, [checked, id, updateTimer])

  const handleSubmit = (e) => {
    e.preventDefault()
    EditCurrentTask(todo.id, value)
    setValue(value)
    setEditing(false)
  }

  useEffect(() => {
    const updateTimeAgo = () => {
      const distance = formatDistanceToNow(createdDate, { addSuffix: true, locale: enUS, includeSeconds: true })
      setTimeAgo(distance)
    }

    updateTimeAgo()

    const interval = setInterval(updateTimeAgo, 1000)

    return () => clearInterval(interval)
  }, [createdDate])

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={(event) => CompletedCurrentTask(id, event.target.checked)}
          checked={checked}
        />
        <label>
          <span className="description">{todo.label}</span>
          <span className="timer">
            <Timer
              id={todo.id}
              min={todo.min}
              sec={todo.sec}
              isRunning={todo.isRunning}
              updateTimer={updateTimer}
              toggleTimer={toggleTimer}
            />
          </span>
          <span className="created">{timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing((prevEditing) => !prevEditing)}></button>
        <button className="icon icon-destroy" onClick={() => DeleteCurrentTask(id)}></button>
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setValue(event.target.value)} type="text" className="edit" value={value} />
        </form>
      )}
    </li>
  )
}

Task.defaultProps = {
  todo: {
    id: 0,
    label: 'New Task',
    checked: false,
    createdDate: Date.now(),
    min: 0,
    sec: 0,
  },
  CompletedCurrentTask: () => {},
  updateTimer: () => {},
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    createdDate: PropTypes.number.isRequired,
  }).isRequired,
  CompletedCurrentTask: PropTypes.func.isRequired,
  DeleteCurrentTask: PropTypes.func.isRequired,
  EditCurrentTask: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
}

export default Task
