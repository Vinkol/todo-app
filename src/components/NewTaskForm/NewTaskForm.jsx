import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import {  } from 'date-fns'

const NewTaskForm = ({ onAddTask }) => {
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newTaskLabel.trim().length > 0) {
      onAddTask(newTaskLabel, min, sec)
      setNewTaskLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={newTaskLabel}
          onChange={(event) => setNewTaskLabel(event.target.value)}
        />
        <input
          type="number"
          className="new-todo-form__timer new-todo"
          placeholder="Min"
          value={min}
          onChange={(event) => setMin(event.target.value)}
          min={0}
          max={59}
        />
        <input
          type="number"
          className="new-todo-form__timer new-todo"
          placeholder="Sec"
          value={sec}
          onChange={(event) => setSec(event.target.value)}
          min={0}
          max={59}
        />
        <input type="submit" hidden></input>
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
