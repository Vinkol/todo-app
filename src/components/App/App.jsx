import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [id, setId] = useState(1)
  const [filter, setFilter] = useState('All')

  const addTask = (description, min, sec) => {
    const newTask = {
      id: id,
      label: description,
      checked: false,
      createdDate: Date.now(),
      min: min,
      sec: sec,
      isRunning: false,
    }
    setTasks([...tasks, newTask])
    setId(id + 1)
  }

  const updateTimer = (id, min, sec, isRunning) => {
    setTasks((tasks) => tasks.map((task) => (task.id === id ? { ...task, min, sec, isRunning } : task)))
  }

  const toggleTimer = (id, state) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isRunning: state } : task)))
  }

  const CompletedTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)))
  }

  const DeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const EditTask = (id, newLabel) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, label: newLabel } : task)))
  }

  const ClearComplited = () => {
    setTasks(tasks.filter((task) => !task.checked))
  }

  const CountTask = tasks.filter((task) => !task.checked).length

  const SelectFilterTask = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.checked
    if (filter === 'Completed') return task.checked
    return false
  })

  return (
    <>
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          todos={SelectFilterTask}
          onCompletedTask={CompletedTask}
          onDeleteTask={DeleteTask}
          onEditTask={EditTask}
          updateTimer={updateTimer}
          toggleTimer={toggleTimer}
        />
        <Footer
          CountTask={CountTask}
          onClearComplited={ClearComplited}
          onChangeFilter={setFilter}
          selectFilter={filter}
        />
      </section>
    </>
  )
}

export default App
