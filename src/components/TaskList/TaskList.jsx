import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({ todos, onCompletedTask, onDeleteTask, onEditTask, updateTimer }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          todo={todo}
          updateTimer={updateTimer}
          CompletedCurrentTask={onCompletedTask}
          DeleteCurrentTask={onDeleteTask}
          EditCurrentTask={onEditTask}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  todos: [],
  onCompletedTask: () => {},
  onDeleteTask: () => {},
  onEditTask: () => {},
  updateTimer: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      timeLeft: PropTypes.number,
    })
  ).isRequired,
  onCompletedTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
}

export default TaskList
