import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddTask }) => {
  const [newTaskLabel, setNewTaskLabel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTaskLabel.trim().length > 0) {
      onAddTask(newTaskLabel)
      setNewTaskLabel('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={newTaskLabel}
          onChange={(e) => setNewTaskLabel(e.target.value)}
        />
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
